"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, Fragment, PropsWithChildren, useState } from "react";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui";
import { CartDrawerItem } from "./cart-drawer-item";

import { useCart } from "@/hooks";
import { PizzaSize, PizzaType } from "@/utils/constants/pizza";
import { getCartItemDetails } from "@/utils/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Title } from "./title";

interface CartDrawerProps {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<CartDrawerProps>> = ({ children }) => {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const onClickCountButtons = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between bg-[#f4f1ee] pb-0">
        {totalAmount > 0 ? (
          <Fragment>
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className="font-bold">
                  {items.length} {items.length === 1 ? "товар" : items.length > 4 ? "товаров" : "товара"}
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="-mx-6 mt-5 flex-1 overflow-auto">
              {items.map(({ id, name, imageUrl, price, quantity, pizzaSize, pizzaType, ingredients, disabled }) => (
                <div key={id} className="mb-2">
                  <CartDrawerItem
                    id={id}
                  name={name}
                    imageUrl={imageUrl}
                    price={price}
                    quantity={quantity}
                    details={getCartItemDetails(ingredients, pizzaType as PizzaType, pizzaSize as PizzaSize)}
                    disabled={disabled}
                    onClickCountButtons={(type) => {
                      onClickCountButtons(id, quantity, type);
                    }}
                    onClickCartItemRemove={() => removeCartItem(id)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="mb-4 flex">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого: <span className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                  </span>
                  <span className="text-lg font-bold">{totalAmount} ₼</span>
                </div>

                <Link href="/checkout">
                  <Button onClick={() => setRedirecting(true)} type="submit" loading={redirecting} className="h-12 w-full text-base">
                    Оформить заказ
                    <ArrowRight className="ml-2 w-5" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </Fragment>
        ) : (
          <div className="mx-auto flex h-full w-72 flex-col items-center justify-center">
            <Image src={"/assets/images/empty-box.png"} alt={"empty-cart"} width={150} height={150} />
            <Title text={"Корзина пуста"} size="sm" />
            <p className="mb-5 text-center text-neutral-500">Ваша корзина пуста. Пожалуйста, выберите какой-нибудь товар</p>
            <SheetClose>
              <Button className="h-12 w-56 text-base">
                <ArrowLeft className="mr-2 w-5" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
