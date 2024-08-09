"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog, DialogContent } from "@/components/ui";
import { cn } from "@/utils/helpers/cn";
import { ProductForm } from "../product-form";

interface ChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("min-h-[550px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0", className)}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
