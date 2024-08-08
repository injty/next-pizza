import React from "react";

import { CountIconButton } from "./count-icon-button";

import { useCartStore } from "@/store";
import { cn } from "@/utils/lib/cn";

export interface CountButtonProps {
  value?: number;
  size?: "sm" | "lg";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({ className, onClick, value = 1, size = "sm" }) => {
  const { loading } = useCartStore();

  return (
    <div className={cn("inline-flex items-center justify-between gap-3", className)}>
      <CountIconButton onClick={() => onClick?.("minus")} disabled={value === 1 || loading} size={size} type="minus" />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CountIconButton onClick={() => onClick?.("plus")} disabled={loading} size={size} type="plus" />
    </div>
  );
};
