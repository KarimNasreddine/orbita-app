import { Currency, PaymentCurrency } from "./currency";

export interface CreateContract {
  paymentID: number;
  payWithCurrency: Currency;
  totalAmount: string;
  totalAmountCurrency: PaymentCurrency;
}
