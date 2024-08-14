import { FC } from "react";

import { cn } from "@/utils/helpers/cn";

interface ErrorTextProps {
  text: string;
  className?: string;
}

export const ErrorText: FC<ErrorTextProps> = ({ className, text }) => {
  return <div className={cn("text-sm text-red-500", className)}>{text}</div>;
};
