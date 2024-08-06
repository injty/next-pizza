import { Ingredient, ProductItem } from "@prisma/client";

import { PizzaSize, PizzaType } from "./constants/pizza";

/**
 *
 * @param size размер пиццы
 * @param type тип пиццы
 * @param ingredients ингредиенты
 * @param selectedIngredients выбранные ингредиенты
 * @param items доступные пиццы
 * @returns number общая стоимость
 */

export const calcTotalPizzaPrice = (size: PizzaSize, type: PizzaType, ingredients: Ingredient[], selectedIngredients: Set<number>, items: ProductItem[]) => {
  const pizzaPrice = items?.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
