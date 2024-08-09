"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import toast from "react-hot-toast";

import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/components/ui";
import { useCartStore } from "@/store";
import { cn } from "@/utils/helpers/cn";

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const { addCartItem, loading } = useCartStore();

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success("Товар добавлен в корзину");
      router.back();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("min-h-[550px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0", className)}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            onSubmit={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            loading={loading}
          />
        ) : (
          <ChooseProductForm onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} price={firstItem.price} loading={loading} />
        )}
      </DialogContent>
    </Dialog>
  );
};
