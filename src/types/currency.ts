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

export function isValidCurrency(value: any): value is Currency {
  return Object.values(Currency).includes(value);
}

export function isValidPaymentCurrency(value: any): value is PaymentCurrency {
  return Object.values(PaymentCurrency).includes(value);
}

export const formatPaymentPrice = (price: string, currency: PaymentCurrency): string => {
  return currency === "BTC"
    ? `${Number(price)?.toFixed(8)} ${currency}`
    : `${Number(price)?.toFixed(2)} ${currency}`;
};
