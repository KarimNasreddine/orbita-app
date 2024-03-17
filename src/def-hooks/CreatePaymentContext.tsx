"use client";

import {
  PaymentDispatch,
  Payment,
  Currency,
  PaymentMode,
  PaymentType,
  AcceptedCurrency,
  PaymentCurrency,
} from "@/types/payment";
import { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  mode: PaymentMode;
  paymentType: PaymentType;
  children?: ReactNode;
}

const acceptedCurrencies = [
  { currency: Currency.ORBT, selected: false },
  { currency: Currency.USDC, selected: false },
  { currency: Currency.NBTC, selected: false },
  { currency: Currency.AKT, selected: false },
  { currency: Currency.ATOM, selected: false },
] as AcceptedCurrency[];

const CreatePaymentContext = createContext({} as Payment);
export const useCreatePaymentContext = () => useContext(CreatePaymentContext);

const CreatePaymentDispatchContext = createContext({} as PaymentDispatch);
export const useCreatePaymentDispatchContext = () =>
  useContext(CreatePaymentDispatchContext);

export default function CreatePaymentProvider({
  children,
  mode,
  paymentType,
}: Props) {
  const [createPaymentState, setCreatePaymentState] = useState<Payment>({
    mode: mode,
    paymentType: paymentType,
    paymentAmount: "",
    paymentName: "",
    paymentAddress: "",
    paymentCurrency: PaymentCurrency.USD,
    acceptedCurrencies: acceptedCurrencies,
    recurringTimeFrame: "",
    recurringTimeFrameInterval: "days",
    safetyPeriodAmount: "",
    leniencyAmount: "3",
  });

  const onPaymentAmountChange = (paymentAmount: string) => {
    setCreatePaymentState((prev) => ({ ...prev, paymentAmount }));
  };

  const onPaymentNameChange = (paymentName: string) => {
    setCreatePaymentState((prev) => ({ ...prev, paymentName }));
  };

  const onPaymentAddressChange = (paymentAddress: string) => {
    setCreatePaymentState((prev) => ({ ...prev, paymentAddress }));
  };

  const onAcceptedCurrenciesChange = (selected: AcceptedCurrency[]) => {
    setCreatePaymentState((prev) => ({
      ...prev,
      acceptedCurrencies: selected,
    }));
  };

  const onRecurringTimeFrameChange = (recurringTimeFrame: string) => {
    setCreatePaymentState((prev) => ({ ...prev, recurringTimeFrame }));
  };

  const onRecurringTimeFrameIntervalChange = (
    recurringTimeFrameInterval: string
  ) => {
    setCreatePaymentState((prev) => ({ ...prev, recurringTimeFrameInterval }));
  };

  const onLeniencyChange = (leniency: string) => {
    setCreatePaymentState((prev) => ({ ...prev, leniencyAmount: leniency }));
  };

  const onPaymentCurrencyChange = (paymentCurrency: PaymentCurrency) => {
    setCreatePaymentState((prev) => ({ ...prev, paymentCurrency }));
  };

  const onSafetyPeriodAmountChange = (safetyPeriod: string) => {
    setCreatePaymentState((prev) => ({
      ...prev,
      safetyPeriodAmount: safetyPeriod,
    }));
  };

  return (
    <CreatePaymentContext.Provider value={createPaymentState}>
      <CreatePaymentDispatchContext.Provider
        value={{
          setPaymentAddress: onPaymentAddressChange,
          setPaymentAmount: onPaymentAmountChange,
          setPaymentName: onPaymentNameChange,
          setPaymentCurrency: onPaymentCurrencyChange,
          setAcceptedCurrencies: onAcceptedCurrenciesChange,
          setRecurringTimeFrame: onRecurringTimeFrameChange,
          setRecurringTimeFrameInterval: onRecurringTimeFrameIntervalChange,
          setLeniency: onLeniencyChange,
          setSafetyPeriodAmount: onSafetyPeriodAmountChange,
        }}
      >
        {children}
      </CreatePaymentDispatchContext.Provider>
    </CreatePaymentContext.Provider>
  );
}
