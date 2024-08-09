import Link from "next/link";
import { FC } from "react";

import { Button } from "../ui";
import { Title } from "./title";

import { Ingredient } from "@prisma/client";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`} scroll={false}>
        <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
          <img className="h-[215px] w-[215px] object-cover" src={imageUrl} alt={name} />
        </div>

        <Title className="mb-1 mt-3 font-bold" text={name} size="sm" />
        <p className="text-sm text-gray-400">
          {ingredients.map((ingredient, index) => ingredient.name.toLowerCase() + (index < ingredients.length - 1 ? ", " : "."))}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} ₼</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
