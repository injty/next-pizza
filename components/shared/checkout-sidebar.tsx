import { FC } from "react";

import { Button, Skeleton } from "../ui";
import { CheckoutItemDetails } from "./checkout-item-details";
import { WhiteBlock } from "./white-block";

import { ArrowRight, Package, Percent, Truck } from "lucide-react";

interface CheckoutSidebarProps {
  loading: boolean;
  totalAmount: number;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: FC<CheckoutSidebarProps> = ({ loading, totalAmount }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="sticky top-4 w-full max-w-[450px] p-6">
      <div className="flex flex-col">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-[36px] w-[140px]" />
        ) : (
          <span className="text-3xl font-extrabold">{totalPrice} ₼</span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package className="mr-2 text-gray-400" size={18} />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-[28px] w-[120px]" /> : `${totalAmount} ₼`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent className="mr-2 text-gray-400" size={18} />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="h-[28px] w-[120px]" /> : `${vatPrice} ₼`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck className="mr-2 text-gray-400" size={18} />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-[28px] w-[120px]" /> : `${DELIVERY_PRICE} ₼`}
      />

      <Button className="mt-6 h-14 w-full rounded-2xl text-base font-bold" loading={loading} type="submit">
        Перейти к оплате
        <ArrowRight className="ml-2 w-5" />
      </Button>
    </WhiteBlock>
  );
};
