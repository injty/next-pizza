import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: number;
}

export const ProductImage: FC<Props> = ({ className, imageUrl, size }) => {
  return (
    <div className={cn("relative flex w-full flex-1 items-center justify-center", className)}>
      <img
        src={imageUrl}
        alt="logo"
        className={cn("relative left-2 top-2 z-10 transition-all duration-300", {
          "h-[300] w-[300]": size === 20,
          "h-[400] w-[400]": size === 30,
          "h-[500] w-[500]": size === 40,
        })}
      />
    </div>
  );
};
