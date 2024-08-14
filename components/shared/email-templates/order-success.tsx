import * as React from "react";

import { CartItemDTO } from "@/services/dto/cart.dto";

interface OrderSuccessProps {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Readonly<OrderSuccessProps>> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! 🎊</h1>
    <p>Ваш заказ #{orderId} оплачен. Список товароов:</p>
    <hr />
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
