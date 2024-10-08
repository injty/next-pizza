import { Ingredient } from "@prisma/client";

import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (ingredients: CartStateItem["ingredients"], pizzaTipe?: PizzaType, pizzaSize?: PizzaSize): string => {
  const details = [];

  if (pizzaTipe && pizzaSize) {
    const typeName = mapPizzaType[pizzaTipe];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) details.push(...ingredients.map((ingredient) => String(ingredient.name).toLowerCase()));

  return details.join(", ");
};
