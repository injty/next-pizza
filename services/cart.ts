import { ApiRoutes } from "./constants";
import { CartDTO } from "./dto/cart.dto";
import { instance } from "./instance";

export const fetchCart = async (): Promise<CartDTO> => {
  return (await instance.get<CartDTO>(ApiRoutes.CART)).data;
};
