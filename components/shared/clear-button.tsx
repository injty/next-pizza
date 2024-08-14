import { FC } from "react";

import { cn } from "@/utils/helpers/cn";
import { X } from "lucide-react";

interface ClearButtonProps {
  onClick?: VoidFunction;
  className?: string;
}

export const ClearButton: FC<ClearButtonProps> = ({ className, onClick }) => {
  return (
    <button type="button" className={cn("absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100", className)} onClick={onClick}>
      <X className="h-5 w-5" />
    </button>
  );
};
