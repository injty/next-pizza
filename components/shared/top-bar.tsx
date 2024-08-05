import { cn } from "@/utils/lib/cn";
import { Category } from "@prisma/client";
import { FC } from "react";

import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface IProps {
  categories: Category[];
  className?: string;
}

export const TopBar: FC<IProps> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5",
        className,
      )}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
