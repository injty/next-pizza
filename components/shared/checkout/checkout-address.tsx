"use client";

import { FC, Fragment } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "../address-input";
import { ErrorText } from "../error-text";
import { FormTextarea } from "../form";
import { WhiteBlock } from "../white-block";

interface CheckoutAddressProps {
  className?: string;
}

export const CheckoutAddress: FC<CheckoutAddressProps> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Fragment>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </Fragment>
          )}
        />

        <FormTextarea className="text-base" name="comment" placeholder="Комментарии к заказу" rows={5} />
      </div>
    </WhiteBlock>
  );
};
