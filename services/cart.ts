import { ApiRoutes } from "./constants";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { instance } from "./instance";

export const fetchCart = async (): Promise<CartDTO> => {
  return (await instance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  return (await instance.patch<CartDTO>(ApiRoutes.CART + `/${itemId}`, { quantity })).data;
};

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  return (await instance.delete<CartDTO>(ApiRoutes.CART + `/${itemId}`)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await instance.post<CartDTO>(ApiRoutes.CART, values)).data;
};
