"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CheckoutAddress, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from "@/components/shared";

import { createOrder } from "@/app/actions";
import { useCart } from "@/hooks";
import { CheckoutFormValues, checkoutFormSchema } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckoutPage() {
  const [submiting, setSubmiting] = useState(false);
  const { items, totalAmount, updateItemQuantity, removeCartItem, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmiting(true);
      const url = await createOrder(data);
      toast.success("Заказ оформлен. Переход к оплате...", { icon: "✅" });
      if (url) {
        location.href = url;
      }
    } catch (error) {
      toast.error("Не удалось оформить заказ", { icon: "❌" });
      setSubmiting(false);
      console.log(error);
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" size="lg" className="mb-8 font-extrabold" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart items={items} loading={loading} updateItemQuantity={updateItemQuantity} removeCartItem={removeCartItem} />
              <CheckoutPersonalForm className={loading ? "pointer-events-none select-none opacity-45" : ""} />
              <CheckoutAddress className={loading ? "pointer-events-none select-none opacity-45" : ""} />
            </div>

            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submiting} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
