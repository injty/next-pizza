import * as React from "react";

interface PayOrderProps {
  orderId: number;
  paymentUrl: string;
  totalAmount: number;
}

export const PayOrder: React.FC<Readonly<PayOrderProps>> = ({ orderId, paymentUrl, totalAmount }) => (
  <div>
    <h1>Заказ #{orderId}!</h1>

    <p>
      Оплатите заказ на сумму <b>{totalAmount}</b> ₼. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
    </p>
  </div>
);
