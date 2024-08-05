"use client";

import { FC, useState } from "react";

import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";

import { PizzaSize, pizzaSizes, PizzaType } from "@/utils/constants/pizza";
import { cn } from "@/utils/lib/cn";

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  ingredients: any;
  items?: any;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: FC<ChoosePizzaFormProps> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const textDetails = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, iste";
  const totalPrice = 350;

  return (
    <div className={cn("flex h-full flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <GroupVariants items={pizzaSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />

        <Button className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">Добавить в корзину за {totalPrice} ₼</Button>
      </div>
    </div>
  );
};
