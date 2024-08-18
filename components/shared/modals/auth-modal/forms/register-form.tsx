"use client";

import { registerUser } from "@/app/actions";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormInput } from "../../../form/form-input";
import { formRegisterScheme, TFormRegisterValues } from "./schemes";

interface Props {
  onClickLogin?: VoidFunction;
  onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClickLogin, onClose }) => {
  const form = useForm<TFormRegisterValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
    },
    resolver: zodResolver(formRegisterScheme),
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullname: data.fullName,
        password: data.password,
      });

      toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Неверный E-Mail или пароль", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput label="E-Mail" name="email" required />
        <FormInput label="Полное имя" name="fullName" required />
        <FormInput label="Пароль" name="password" required type="password" />
        <FormInput label="Подтвердите пароль" name="confirmPassword" required type="password" />

        <Button className="h-12 text-base" loading={form.formState.isSubmitting} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
