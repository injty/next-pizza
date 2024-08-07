import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calt-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients?: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map(
    (item): CartStateItem => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcCartItemTotalPrice(item),
      pizzaSize: item.productItem.size,
      pizzaType: item.productItem.pizzaType,
      ingredients: item.ingredients.map((ingredient) => {
        return { name: ingredient.name, price: ingredient.price };
      }),
    }),
  );

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
