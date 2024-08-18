import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calt-cart-item-total-price";

export type CartStateItem = {
  disabled?: boolean;
  id: number;
  imageUrl: string;
  ingredients?: Array<{ name: string; price: number }>;
  name: string;
  pizzaSize?: null | number;
  pizzaType?: null | number;
  price: number;
  quantity: number;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  console.log("[GET-CART-DETAILS LOG]:", data);
  const items = data.items.map(
    (item): CartStateItem => ({
      disabled: false,
      id: item.id,
      imageUrl: item.productItem.product.imageUrl,
      ingredients: item.ingredients.map((ingredient) => {
        return { name: ingredient.name, price: ingredient.price };
      }),
      name: item.productItem.product.name,
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      price: calcCartItemTotalPrice(item),
      quantity: item.quantity,
    }),
  );

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
