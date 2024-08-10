"use client";

import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from "@/components/shared";
import { Input, Textarea } from "@/components/ui";

import { useCart } from "@/hooks";
import { PizzaSize, PizzaType } from "@/utils/constants/pizza";
import { getCartItemDetails } from "@/utils/helpers";

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButtons = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" size="lg" className="mb-8 font-extrabold" />
      <div className="flex gap-10">
        <div className="mb-20 flex flex-1 flex-col gap-10">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map(({ id, name, imageUrl, price, disabled, quantity, pizzaSize, pizzaType, ingredients }) => (
                <CheckoutItem
                  key={id}
                  id={id}
                  imageUrl={imageUrl}
                  details={getCartItemDetails(ingredients, pizzaType as PizzaType, pizzaSize as PizzaSize)}
                  name={name}
                  price={price}
                  quantity={quantity}
                  disabled={disabled}
                  onClickCountButton={(type) => {
                    onClickCountButtons(id, quantity, type);
                  }}
                  onClickRemove={() => removeCartItem(id)}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input name="lastName" className="text-base" placeholder="Фамилия" />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Моб. номер" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input name="address" className="text-base" placeholder="Введите адрес" />
              <Textarea className="text-base" rows={5} placeholder="Комментарии к заказу" />
            </div>
          </WhiteBlock>
        </div>

        <CheckoutSidebar totalAmount={totalAmount} />
      </div>
    </Container>
  );
}
