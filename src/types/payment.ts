export type PaymentMode = "basic" | "business";

export type PaymentType = "direct" | "subscription" | "safefi";

export enum Currency {
  ORBT = "ORBT",
  USDC = "USDC",
  NBTC = "NBTC",
  AKT = "AKT",
  ATOM = "ATOM",
}

export type AcceptedCurrency = {
  currency: Currency;
  selected: boolean;
};

export enum PaymentCurrency {
  USD = "USD",
  CAD = "CAD",
  BTC = "BTC",
}

export type CreatePayment = {
  mode: PaymentMode;
  paymentType: PaymentType;
  paymentAmount: string;
  paymentName: string;
  paymentAddress: string;
  paymentCurrency: PaymentCurrency;
  acceptedCurrencies: AcceptedCurrency[];
  recurringTimeFrame?: string;
  recurringTimeFrameInterval?: string;
  safetyPeriodAmount?: string;
  leniencyAmount?: string;
};

export type CreatePaymentDispatch = {
  setPaymentAmount: (paymentAmount: string) => void;
  setPaymentName: (paymentName: string) => void;
  setPaymentAddress: (paymentAddress: string) => void;
  setPaymentCurrency: (paymentCurrency: PaymentCurrency) => void;
  setAcceptedCurrencies: (selected: AcceptedCurrency[]) => void;
  setRecurringTimeFrame: (recurringTimeFrame: string) => void;
  setRecurringTimeFrameInterval: (recurringTimeFrameInterval: string) => void;
  setLeniency: (leniency: string) => void;
  setSafetyPeriodAmount: (safetyPeriod: string) => void;
};

export type Payment = {
  id: string;
  creator: string;
  subscriptionType: string;
  acceptedPaymentType: string;
  name: string;
  priceAmount: string;
  priceCurrency: string;
  recurringTimeFrame: string;
  recurringTimeFrameAmount: string;
  merchantPayoutAddress: string;
  paymentLeniency: number;
  clientCounts: number;
  paymentMode: string;
  paymentType: string;
  safetyPeriod: number;
  createdAt: string;
};
