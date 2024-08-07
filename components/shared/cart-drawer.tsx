"use client";

import Link from "next/link";
import { FC, PropsWithChildren, useEffect } from "react";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";

import { useCartStore } from "@/store";
import { getCartDetails, getCartItemDetails } from "@/utils";
import { PizzaSize, PizzaType } from "@/utils/constants/pizza";
import { ArrowRight } from "lucide-react";

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = ({ className, children }) => {
  const { items, totalAmount, fetchCartItems } = useCartStore();
  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between bg-[#f4f1ee] pb-0">
        <SheetHeader>
          <SheetTitle>
            В корзине{" "}
            <span className="font-bold">
              {items.length} {items.length === 1 ? "товар" : items.length > 4 ? "товаров" : "товара"}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 flex-1 overflow-auto">
          <div className="mb-2">
            {items.map(({ id, name, imageUrl, price, quantity, pizzaSize, pizzaType, ingredients }) => (
              <CartDrawerItem
                key={id}
                id={id}
                name={name}
                imageUrl={imageUrl}
                price={price}
                quantity={quantity}
                details={pizzaSize && pizzaType ? getCartItemDetails(pizzaType as PizzaType, pizzaSize as PizzaSize, ingredients) : ""}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="mb-4 flex">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого: <span className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
              </span>
              <span className="text-lg font-bold">{totalAmount} ₼</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="h-12 w-full text-base">
                Оформить заказ
                <ArrowRight className="ml-2 w-5" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
