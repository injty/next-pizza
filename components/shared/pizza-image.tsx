import { cn } from "@/utils/lib/cn";
import { FC } from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: number;
}

export const PizzaImage: FC<Props> = ({ className, imageUrl, size }) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-1 items-center justify-center",
        className,
      )}>
      <img
        src={imageUrl}
        alt="logo"
        className={cn(
          "relative left-2 top-2 z-10 transition-all duration-300",
          {
            "h-[300px] w-[300px]": size === 20,
            "h-[400px] w-[400px]": size === 30,
            "h-[500px] w-[500px]": size === 40,
          },
        )}
      />
    </div>
  );
};
