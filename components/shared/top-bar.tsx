import { cn } from "@/lib/utils";
import { FC } from "react";

import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface IProps {
  className?: string;
}

export const TopBar: FC<IProps> = ({ className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
