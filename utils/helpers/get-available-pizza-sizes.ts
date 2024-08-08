import { ProductItem } from "@prisma/client";

import type { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "../constants/pizza";

export const getAvailablePizzaSizes = (type: PizzaType, items?: ProductItem[]): Variant[] => {
  const filteredPizzasByType = items?.filter((item) => item.pizzaType === type);
  return pizzaSizes.map((size) => ({
    name: size.name,
    value: size.value,
    disabled: !filteredPizzasByType?.some((pizza) => Number(pizza.size) === Number(size.value)),
  }));
};
