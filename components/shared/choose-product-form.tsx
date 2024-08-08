import { FC } from "react";

import { PizzaImage } from "./pizza-image";

import { cn } from "@/utils/lib/cn";
import { Button } from "../ui";
import { Title } from "./title";

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit: VoidFunction;
  className?: string;
}

export const ChooseProductForm: FC<ChooseProductFormProps> = ({ className, imageUrl, name, price, loading, onSubmit }) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={30} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <Button onClick={() => onSubmit()} className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base" loading={loading}>
          Добавить в корзину за {price} ₼
        </Button>
      </div>
    </div>
  );
};
