import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { FC, ReactNode } from "react";

interface IProps {
  className?: string;
}

export const SortPopup: FC<IProps> = ({ className }) => {
  return (
    <div className={cn("inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer", className)}>
      <ArrowUpDown />
      <b>Сортировка:</b>
      <b className="text-primary">по цене</b>
    </div>
  );
};
