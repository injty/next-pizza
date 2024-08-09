import { cn } from "@/utils/helpers/cn";
import { FC } from "react";

import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";

import { Trash2Icon } from "lucide-react";
import type { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface CartDrawerItemProps extends CartItemProps {
  onClickCartItemRemove: () => void;
  onClickCountButtons: (type: "plus" | "minus") => void;
  className?: string;
}

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  className,
  id,
  name,
  imageUrl,
  price,
  quantity,
  disabled,
  details,
  onClickCountButtons,
  onClickCartItemRemove,
}) => {
  return (
    <div className={cn("flex gap-6 bg-white p-5", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButtons} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon onClick={onClickCartItemRemove} className="cursor-pointer text-gray-400 hover:text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
