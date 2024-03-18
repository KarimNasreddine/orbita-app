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
