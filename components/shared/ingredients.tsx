import { cn } from "@/utils/lib/cn";
import { FC } from "react";

import { CircleCheck } from "lucide-react";

interface IngredientsProps {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: VoidFunction;
}

export const Ingredients: FC<IngredientsProps> = ({ className, imageUrl, name, price, active = false, onClick }) => {
  return (
    <div
      className={cn(
        "relative flex w-32 cursor-pointer flex-col items-center rounded-md border-[1px] border-transparent bg-white p-1 text-center shadow-md",
        {
          "border border-primary": active,
        },
        className,
      )}
      onClick={onClick}>
      {active && <CircleCheck className="absolute right-2 top-2 text-primary" />}
      <img width={110} height={110} src={imageUrl} alt={name} />
      <span className="mb-1 text-xs">{name}</span>
      <span className="font-bold">{price} ₼</span>
    </div>
  );
};
