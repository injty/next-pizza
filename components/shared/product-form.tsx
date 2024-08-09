"use client";

import { FC } from "react";
import toast from "react-hot-toast";

import { ChoosePizzaForm } from "./choose-pizza-form";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store";
import { ChooseProductForm } from "./choose-product-form";

interface ProductFormProps {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: FC<ProductFormProps> = ({ product, onSubmit: _onSubmit }) => {
  const { addCartItem, loading } = useCartStore();

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success("Товар добавлен в корзину");
      _onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        onSubmit={onSubmit}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        loading={loading}
      />
    );
  }

  return <ChooseProductForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} price={firstItem.price} loading={loading} />;
};
