"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CheckoutAddress, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from "@/components/shared";

import { createOrder } from "@/app/actions";
import { useCart } from "@/hooks";
import { Api } from "@/services/api-client";
import { checkoutFormSchema, CheckoutFormValues } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [submiting, setSubmiting] = useState(false);
  const { items, loading, removeCartItem, totalAmount, updateItemQuantity } = useCart();

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      address: "",
      comment: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    resolver: zodResolver(checkoutFormSchema),
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullname.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
    // eslint-disable-next-line
  }, []);

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
      <Title className="mb-8 font-extrabold" size="lg" text="Оформление заказа" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart items={items} loading={loading} removeCartItem={removeCartItem} updateItemQuantity={updateItemQuantity} />
              <CheckoutPersonalForm className={loading ? "pointer-events-none select-none opacity-45" : ""} />
              <CheckoutAddress className={loading ? "pointer-events-none select-none opacity-45" : ""} />
            </div>

            <CheckoutSidebar loading={loading || submiting} totalAmount={totalAmount} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
