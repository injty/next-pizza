"use client";
import { useCategoryStore } from "@/store";

import { cn } from "@/utils/lib/cn";
import { Category } from "@prisma/client";
import { FC } from "react";

interface IProps {
  items: Category[];
  className?: string;
}

export const Categories: FC<IProps> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1", className)}>
      {items.map(({ name, id }) => (
        <a
          className={cn("flex h-11 items-center rounded-2xl px-5 font-bold", categoryActiveId === id && "bg-white text-primary shadow-md shadow-gray-200")}
          key={id}
          href={`#${name}`}>
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
