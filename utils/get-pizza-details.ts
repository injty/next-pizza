import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from "./constants/pizza";

export const getPizzaDetails = (size: PizzaSize, type: PizzaType, ingredients: Ingredient[], items: ProductItem[], selectedIngredients: Set<number>) => {
  const totalPrice = calcTotalPizzaPrice(size, type, ingredients, selectedIngredients, items);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца, ингредиенты: ${ingredients.map((ingredient) => String(ingredient.name).toLowerCase()).join(", ")}`;

  return { totalPrice, textDetails };
};
