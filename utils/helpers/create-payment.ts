import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface createPaymentProps {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: createPaymentProps) {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      descriptio: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        Authorization: "Bearer " + process.env.YOOKASSA_API_KEY, // Ваш API-ключ
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
