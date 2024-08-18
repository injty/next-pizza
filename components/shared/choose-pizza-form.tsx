"use client";

import { Ingredient, ProductItem } from "@prisma/client";
import { FC } from "react";

import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { Ingredients } from "./ingredients";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

import { usePizzaOptions } from "@/hooks";
import { PizzaSize, PizzaType, pizzaTypes } from "@/utils/constants/pizza";
import { getPizzaDetails } from "@/utils/helpers";
import { cn } from "@/utils/helpers/cn";

interface ChoosePizzaFormProps {
  className?: string;
  imageUrl: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  name: string;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: FC<ChoosePizzaFormProps> = ({ className, imageUrl, ingredients, items, loading, name, onSubmit }) => {
  const { addIngredient, availableSizes, currentItemId, selectedIngredients, setSize, setType, size, type } = usePizzaOptions(items);
  const { textDetails, totalPrice } = getPizzaDetails(size, type, ingredients, items, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex h-full flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title className="mb-1 font-extrabold" size="md" text={name} />

        <p className="text-gray-400">{textDetails}</p>

        <div className="mt-5 flex flex-col gap-4">
          <GroupVariants items={availableSizes} onClick={(value) => setSize(Number(value) as PizzaSize)} value={String(size)} />
          <GroupVariants items={pizzaTypes} onClick={(value) => setType(Number(value) as PizzaType)} value={String(type)} />
        </div>

        <div className="scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <Ingredients
                active={selectedIngredients.has(ingredient.id)}
                imageUrl={ingredient.imageUrl}
                key={ingredient.id}
                name={ingredient.name}
                onClick={() => addIngredient(ingredient.id)}
                price={ingredient.price}
              />
            ))}
          </div>
        </div>

        <Button className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base" loading={loading} onClick={() => handleClickAdd()}>
          Добавить в корзину за {totalPrice} ₼
        </Button>
      </div>
    </div>
  );
};
