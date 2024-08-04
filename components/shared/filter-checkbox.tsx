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
  name?: string;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = ({ className, text, value, endAdornment, onCheckedChange, checked, name }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox id={`checkbox-${String(name)}-${String(value)}`} onCheckedChange={onCheckedChange} checked={checked} value={value} className="h-6 w-6 rounded-[8px]" />
      <label htmlFor={`checkbox-${String(name)}-${String(value)}`} className="flex-1 cursor-pointer leading-none">
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
