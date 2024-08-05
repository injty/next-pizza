import { FC } from "react";

import { PizzaImage } from "./pizza-image";

import { cn } from "@/utils/lib/cn";
import { Button } from "../ui";
import { Title } from "./title";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({
  className,
  imageUrl,
  name,
  onClickAdd,
}) => {
  const textDetails =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, iste";
  const totalPrice = 350;

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base">
          Добавить в корзину за {totalPrice} ₼
        </Button>
      </div>
    </div>
  );
};
