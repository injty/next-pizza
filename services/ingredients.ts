import { Ingredient } from "@prisma/client";

import { ApiRoutes } from "./constants";
import { instance } from "./instance";

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  return (await instance.get<Ingredient[]>(ApiRoutes.ALL_INGREDIENTS)).data;
};
