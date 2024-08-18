import { FC } from "react";

import { FormInput } from "../form";
import { WhiteBlock } from "../white-block";

interface CheckoutPersonalFormProps {
  className?: string;
}

export const CheckoutPersonalForm: FC<CheckoutPersonalFormProps> = ({ className }) => {

  return (
    <WhiteBlock className={className} title="2. Персональные данные">
      <div className="grid grid-cols-2 gap-5">
        <FormInput className="text-base" name="firstName" placeholder="Имя" />
        <FormInput className="text-base" name="lastName" placeholder="Фамилия" />
        <FormInput className="text-base" name="email" placeholder="E-mail" />
        <FormInput className="text-base" name="phone" placeholder="Моб. номер" />
      </div>
    </WhiteBlock>
  );
};
