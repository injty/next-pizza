import { Ingredient, Product, ProductItem } from "@prisma/client";

export type TProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};
