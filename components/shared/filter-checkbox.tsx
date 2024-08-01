import { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Checkbox } from "../ui";

export interface FilterCheckboxProps {
  className?: string;
  text: string;
  value: string;
  endAdornment?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = ({ className, text, value, endAdornment, onCheckedChange, checked }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox onCheckedChange={onCheckedChange} checked={checked} value={value} className="w-6 h-6 rounded-[8px]" id={`checkbox-${String(value)}`} />
      <label htmlFor={`checkbox-${String(value)}`} className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
