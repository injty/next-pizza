"use client";

import { Product } from "@prisma/client";
import Link from "next/link";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

import { Api } from "@/services/api-client";
import { cn } from "@/utils/lib/cn";
import { Search } from "lucide-react";

interface Props {
  className?: string;
}

export const SearchInput: FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (err) {
        console.error(err);
      }
    },
    500,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <Fragment>
      {focused && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/50" />
      )}

      <div
        ref={ref}
        className={cn(
          "relative z-30 flex h-11 flex-1 justify-between rounded-2xl",
          className,
        )}>
        <Search className="absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400" />
        <input
          className="w-full rounded-2xl bg-gray-100 pl-11 outline-none"
          type="text"
          placeholder="Найти пиццу"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200",
              focused && "visible top-12 opacity-100",
            )}>
            {products.map((product) => (
              <div key={product.id}>
                <Link
                  onClick={onClickItem}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                  href={`/product/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-8 w-8 rounded-sm"
                  />
                  <div>{product.name}</div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};
