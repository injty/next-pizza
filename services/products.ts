import { Product } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { instance } from "./instance";

export const search = async (query: string): Promise<Product[]> => {
  return (await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, { params: { query } })).data;
};
