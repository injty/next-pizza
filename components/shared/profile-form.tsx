"use client";

import { updateUserInfo } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui";
import { Container } from "./container";
import { FormInput } from "./form";
import { formRegisterScheme, TFormRegisterValues } from "./modals/auth-modal/forms/schemes";
import { Title } from "./title";

interface ProfileFormProps {
  data: User;
}

export const ProfileForm: FC<ProfileFormProps> = ({ data }) => {
  const form = useForm({
    defaultValues: {
      confirmPassword: "",
      email: data.email,
      fullName: data.fullname,
      password: "",
    },
    resolver: zodResolver(formRegisterScheme),
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullname: data.fullName,
        password: data.password,
        verified: new Date(),
      });

      toast.error("Данные обновлены", { icon: "✅" });
    } catch (error) {
      toast.error("Ошибка при обновлении данных", { icon: "❌" });
      return toast.error("Произошла ошибка при обновлении данных");
    }
  };

  const handleClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title className="fontbold" size="md" text={`Профиль ${data.fullname}`} />

      <FormProvider {...form}>
        <form className="mt-10 flex w-96 flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput label="E-mail" name="email" required />
          <FormInput label="Полное имя" name="fullName" required />

          <FormInput label="Новый пароль" name="password" required type="password" />
          <FormInput label="Повторите пароль" name="confirmPassword" required type="password" />

          <Button className="mt-10 text-base" disabled={form.formState.isSubmitting} type="submit">
            Сохранить
          </Button>

          <Button className="text-base" disabled={form.formState.isSubmitting} onClick={handleClickSignOut} type="button" variant={"secondary"}>
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
