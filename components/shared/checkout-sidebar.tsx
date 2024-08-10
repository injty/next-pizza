import { FC } from "react";

import { Button } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";

import { ArrowRight, Package, Percent, Truck } from "lucide-react";

interface CheckoutSidebarProps {
  totalAmount: number;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: FC<CheckoutSidebarProps> = ({ totalAmount }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <div className="w-full max-w-[450px]">
      <WhiteBlock className="sticky top-4 p-6">
        <div className="flex flex-col">
          <span className="text-xl">Итого:</span>
          <span className="text-3xl font-extrabold">{totalPrice} ₼</span>
        </div>
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Package size={18} className="mr-2 text-gray-400" />
              Стоимость корзины:
            </div>
          }
          value={`${totalAmount} ₼`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Percent size={18} className="mr-2 text-gray-400" />
              Налоги:
            </div>
          }
          value={`${vatPrice} ₼`}
        />
        <CheckoutItemDetails
          title={
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-gray-400" />
              Доставка:
            </div>
          }
          value="30 000 ₼"
        />

        <Button type="submit" className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
          Перейти к оплате
          <ArrowRight className="ml-2 w-5" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
