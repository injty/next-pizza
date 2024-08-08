import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

import type { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/utils/constants/pizza";
import { getAvailablePizzaSizes } from "@/utils/helpers";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (value: PizzaSize) => void;
  setType: (value: PizzaType) => void;
  addIngredient: (id: number) => void;
  items: ProductItem[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSizes(type, items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find((pizza) => Number(pizza.value) === Number(size) && !pizza.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    currentItemId,
    availableSizes,
    setSize,
    setType,
    addIngredient,
    items,
  };
};
