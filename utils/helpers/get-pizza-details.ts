import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (size: PizzaSize, type: PizzaType, ingredients: Ingredient[], items: ProductItem[], selectedIngredients: Set<number>) => {
  const totalPrice = calcTotalPizzaPrice(size, type, ingredients, selectedIngredients, items);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца, ингредиенты: ${ingredients.map((ingredient) => String(ingredient.name).toLowerCase()).join(", ")}`;

  return { totalPrice, textDetails };
};
