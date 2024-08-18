import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { FormInput } from "@/components/shared/form";
import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";

import { formLoginScheme, TFormLoginValues } from "./schemes";

interface LoginFormProps {
  className?: string;
  onClose: VoidFunction;
}

export const LoginForm: FC<LoginFormProps> = ({ className, onClose }) => {
  const form = useForm<TFormLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formLoginScheme),
  });

  const onSubmit = async (data: TFormLoginValues) => {
    console.log(data);
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!response?.ok) {
        throw Error();
      }

      toast.success("Вы вошли в аккаунт", { icon: "🚀" });
      onClose?.();
    } catch (error) {
      console.log("[LOGIN-FORM ERROR]:", error);
      toast.error("Произошла ошибка при войти в аккаунт", { icon: "🚨" });
    } finally {
      onClose();
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <Title className="font-bold" size="md" text="Вход в аккаунт" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img alt="phone-icon" height={60} src="/assets/images/phone-icon.png" width={60} />
        </div>

        <FormInput label="E-mail" name="email" required />
        <FormInput label="Password" name="password" required />

        <Button className="h-12 text-base" loading={form.formState.isSubmitting}>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
