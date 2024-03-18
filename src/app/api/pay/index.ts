import { env } from "@/env";

import "server-only";
import { Payment } from "@/types/payment";

export const getPayment = async (paymendId: string): Promise<Payment> => {
  const res = await fetch(`${env.apiURL}/orbita/pay/payment/${paymendId}`);
  if (!res.ok) {
    throw new Error("Cannot find Payment ID. Please try again.");
  }

  try {
    const json = await res.json();
    const payment = json.Payment as Payment;
    return payment;
  } catch (e) {
    console.log(e);
    throw new Error("Cannot find Payment ID. Please try again.");
  }
};
