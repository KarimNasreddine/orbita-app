import { PaymentCurrency } from "./currency";

export type CheckoutData = {
    checkoutId: string;
    paymentId: number;
    totalAmount: string;
    totalAmountCurrency: PaymentCurrency;
    items: Array<{
      itemName: string;
      itemPriceAmount: string;
      itemPriceCurrency: PaymentCurrency;
      itemQuantity: number;
    }>;
  };
  