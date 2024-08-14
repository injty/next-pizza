"use client";

import { FC } from "react";

import { cn } from "@/utils/helpers/cn";
import { X } from "lucide-react";
import * as CartItemDetails from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface CheckoutItemProps extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: VoidFunction;
  className?: string;
}

export const CheckoutItem: FC<CheckoutItemProps> = ({ className, name, price, details, imageUrl, quantity, disabled, onClickRemove, onClickCountButton }) => {
  return (
    <div className={cn("flex items-center justify-between", { "pointer-events-none opacity-50": disabled }, className)}>
      <div className="flex flex-1 items-center gap-5">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="ml-20 flex items-center gap-5">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemove}>
          <X size={20} className="cursor-pointer text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
};
