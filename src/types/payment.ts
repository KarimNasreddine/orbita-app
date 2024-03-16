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

export type Payment = {
  mode: PaymentMode;
  paymentType: PaymentType;
  paymentAmount: string;
  paymentName: string;
  paymentAddress: string;
  acceptedCurrencies: AcceptedCurrency[];
  recurringTimeFrame?: string;
  recurringTimeFrameInterval?: string;
  safetyPeriodAmount?: string;
  leniencyAmount?: string;
};

export type PaymentDispatch = {
  setPaymentAmount: (paymentAmount: string) => void;
  setPaymentName: (paymentName: string) => void;
  setPaymentAddress: (paymentAddress: string) => void;
  setAcceptedCurrencies: (selected: AcceptedCurrency[]) => void;
  setRecurringTimeFrame: (recurringTimeFrame: string) => void;
  setRecurringTimeFrameInterval: (recurringTimeFrameInterval: string) => void;
  setLeniency: (leniency: string) => void;
  setSafetyPeriodAmount: (safetyPeriod: string) => void;
};


export type DirectPayment = {
  mode: PaymentMode;
  paymentType: "direct";
  paymentAmount: string;
  paymentName: string;
  paymentAddress: string;
  acceptedCurrencies: AcceptedCurrency[];
};

export type SubscriptionPayment = {
  mode: PaymentMode;
  paymentType: "subscription";
  subscriptionType: string;
  paymentAmount: string;
  paymentName: string;
  paymentAddress: string;
  acceptedCurrencies: AcceptedCurrency[];
  recurringTimeFrame: string;
  recurringTimeFrameInterval: string;
  leniencyAmount?: string;
  leniencyInterval?: string;
};

export type SafefiPayment = {
  mode: PaymentMode;
  paymentType: "safefi";
  paymentAmount: string;
  paymentName: string;
  paymentAddress: string;
  acceptedCurrencies: AcceptedCurrency[];
  safetyPeriodAmount: string;
  safetyPeriodInterval: string;
  leniencyAmount?: string;
  leniencyInterval?: string;
};


