import { FC } from "react";

import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";

import { PizzaSize, PizzaType } from "@/utils/constants/pizza";
import { getCartItemDetails } from "@/utils/helpers";
import { CartStateItem } from "@/utils/helpers/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface CheckoutCartProps {
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  className?: string;
}

export const CheckoutCart: FC<CheckoutCartProps> = ({ className, items, loading, updateItemQuantity, removeCartItem }) => {
  const onClickCountButtons = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock className={className} title="1. Корзина">
      <div className="flex flex-col gap-5">
        {loading && items.length === 0
          ? [...Array(5)].map((_, i) => <CheckoutItemSkeleton key={i} />)
          : items.map(({ id, name, imageUrl, price, disabled, quantity, pizzaSize, pizzaType, ingredients }) => (
              <CheckoutItem
                key={id}
                id={id}
                imageUrl={imageUrl}
                details={getCartItemDetails(ingredients, pizzaType as PizzaType, pizzaSize as PizzaSize)}
                name={name}
                price={price}
                quantity={quantity}
                disabled={disabled}
                onClickCountButton={(type) => {
                  onClickCountButtons(id, quantity, type);
                }}
                onClickRemove={() => removeCartItem(id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
