"use client";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: FC<Props> = ({ categoryId, title, items, listClassName, className }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) setActiveCategoryId(categoryId);
  }, [intersection?.isIntersecting, categoryId, setActiveCategoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title className="font-extrabold mb-5" text={title} size="lg" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCard key={item.id} id={item.id} name={item.name} price={item.items[0].price} imageUrl={item.items[0].imageUrl} />
        ))}
      </div>
    </div>
  );
};
