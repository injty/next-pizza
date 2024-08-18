import { z } from "zod";

export const passwordScheme = z.string().min(4, { message: "Минимальная длина пароля 4 символов" });

export const formLoginScheme = z.object({
  email: z.string().email({ message: "Введите корректный Email" }),
  password: passwordScheme,
});

export const formRegisterScheme = formLoginScheme
  .merge(
    z.object({
      confirmPassword: passwordScheme,
      fullName: z.string().min(2, { message: "Введите корректное имя" }),
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginScheme>;
export type TFormRegisterValues = z.infer<typeof formRegisterScheme>;
