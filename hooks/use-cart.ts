import { useEffect } from "react";

import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { useCartStore } from "@/store";
import { CartStateItem } from "@/utils/helpers/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cartState;
};
