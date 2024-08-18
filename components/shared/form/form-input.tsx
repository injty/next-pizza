"use client";

import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  required?: boolean;
}

export const FormInput: FC<Props> = ({ className, label, name, required, ...props }) => {
  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="mb-2 font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-base" {...register(name)} {...props} />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {error && <ErrorText className="mt-2" text={error} />}
    </div>
  );
};
