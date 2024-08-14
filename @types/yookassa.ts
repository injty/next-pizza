export interface PaymentData {
  amount: Amount;
  confirmation: Confirmation;
  created_at: string;
  description: string;
  id: string;
  metadata: Metadata;
  paid: boolean;
  recipient: Recipient;
  refundable: boolean;
  status: string;
  test: boolean;
}

export interface Amount {
  currency: string;
  value: string;
}

export interface Recipient {
  account_id: string;
  gateway_id: string;
}

export interface Confirmation {
  confirmation_url: string;
  type: string;
}

export interface Metadata {
  order_id: string;
}

export type PaymentCallbackData = {
  event: string;
  object: {
    amount: { currency: "RUB"; value: string };
    authorization_details: {
      auth_code: string;
      rrn: string;
    };
    captured_at: string;
    created_at: string;
    description: string;
    id: string;
    income_amount: { currency: "RUB"; value: string };
    metadata: { order_id: string };
    paid: boolean;
    payment_method: {
      id: string;
      saved: boolean;
      title: string;
      type: string;
    };
    recipient: { account_id: string; gateway_id: string };
    refundable: true;
    refunded_amount: { currency: "RUB"; value: string };
    status: string;
    test: boolean;
  };
  type: string;
};
