import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = {
  ingredients: Ingredient[];
  items: ProductItem[];
} & Product;
