import { cn } from "@/utils/lib/cn";
import { ArrowUpDown } from "lucide-react";
import { FC, ReactNode } from "react";

interface IProps {
  className?: string;
}

export const SortPopup: FC<IProps> = ({ className }) => {
  return (
    <div className={cn("inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5", className)}>
      <ArrowUpDown />
      <b>Сортировка:</b>
      <b className="text-primary">по цене</b>
    </div>
  );
};
