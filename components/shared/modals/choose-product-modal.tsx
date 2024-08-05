"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";

import { TProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/components/ui";
import { cn } from "@/utils/lib/cn";

interface ChooseProductModalProps {
  product: TProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({
  className,
  product,
}) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-[550px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0",
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
