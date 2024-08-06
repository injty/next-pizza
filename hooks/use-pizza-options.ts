import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

import type { Variant } from "@/components/shared/group-variants";
import { getAvailablePizzaSizes } from "@/utils";
import { PizzaSize, PizzaType } from "@/utils/constants/pizza";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
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
    availableSizes,
    setSize,
    setType,
    addIngredient,
    items,
  };
};
