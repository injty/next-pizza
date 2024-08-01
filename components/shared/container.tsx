import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

interface IProps {
  className?: string;
}

export const Container: FC<PropsWithChildren<IProps>> = ({ className, children }) => {
  return <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>;
};
