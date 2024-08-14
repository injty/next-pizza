"use client";

import { FC, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Textarea } from "@/components/ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<FormTextareaProps> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
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
        <Textarea className="h-12 text-base" {...register(name)} {...props} />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {error && <ErrorText text={error} className="mt-2" />}
    </div>
  );
};
