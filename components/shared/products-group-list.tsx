"use client";
import { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { ProductCard } from "./product-card";
import { Title } from "./title";

import { ProductWithRelations } from "@/@types/prisma";
import { useCategoryStore } from "@/store";
import { cn } from "@/utils/helpers/cn";

interface Props {
  title: string;
  items: ProductWithRelations[];
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
      <Title className="mb-5 font-extrabold" text={title} size="lg" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item) => (
          <ProductCard key={item.id} id={item.id} name={item.name} price={item.items[0].price} imageUrl={item.imageUrl} ingredients={item.ingredients} />
        ))}
      </div>
    </div>
  );
};
