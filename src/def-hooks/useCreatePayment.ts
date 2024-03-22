import useOrbitaPay from "../hooks/useOrbitaPay";
import { fromBech32 } from "@cosmjs/encoding";
import { StdFee } from "@keplr-wallet/types";
import BigNumber from "bignumber.js";
import { CreatePayment, PaymentMode } from "@/types/payment";
import { MsgCreatePayment } from "../../ts-client/orbita.pay/module";
import { useAddressContext } from "./addressContext";
import { AcceptedCurrency, isValidPaymentCurrency } from "@/types/currency";

export const useCreatePayment = () => {
  const { address } = useAddressContext();
  const { CreatePayment } = useOrbitaPay();

  const parseAmount = (amount: string): BigNumber => {
    return amount == "" ? new BigNumber(0) : new BigNumber(amount);
  };

  const isValidPriceAmount = (
    mode: PaymentMode,
    paymentAmount: string,
    paymentCurrency: string
  ) => {
    if (mode === "business") {
      const valid = paymentAmount === ""; //&& paymentCurrency === "";
      if (!valid) {
        throw new Error(
          "Business mode should not have a payment amount or currency"
        );
      }
      return valid;
    }
    const parsedAmount = parseAmount(paymentAmount);
    const valid =
      !parsedAmount.isNaN() &&
      parsedAmount.isPositive() &&
      !parsedAmount.isZero() &&
      ((paymentCurrency === "BTC" &&
        parsedAmount.isGreaterThanOrEqualTo(0.00001)) ||
        ((paymentCurrency === "USD" || paymentCurrency === "CAD") &&
          parsedAmount.isGreaterThanOrEqualTo(1)));
    if (!valid) {
      throw new Error("Payment amount must be a positive number");
    }
  };

  const isValidPriceCurrency = (paymentCurrency: string) => {
    const valid = isValidPaymentCurrency(
      paymentCurrency
    );
    if (!valid) {
      throw new Error("Payment currency must be BTC, USD, or CAD");
    }
    return valid;
  };

  const isValidPaymentName = (paymentName: string) => {
    const valid = paymentName !== "";
    if (!valid) {
      throw new Error("Payment name cannot be empty");
    }
    return valid;
  };

  const isValidRecurringTimeFrameAmount = (recurringTimeFrame?: string) => {
    const parsedAmount = parseAmount(recurringTimeFrame || "");
    const valid =
      !parsedAmount.isNaN() &&
      parsedAmount.isPositive() &&
      !parsedAmount.isZero() &&
      parsedAmount.isInteger();
    if (!valid) {
      throw new Error("Recurring time frame must be a positive integer");
    }
    return valid;
  };
  const isValidPaymentLeniency = (leniencyAmount?: string) => {
    const parsedAmount = parseAmount(leniencyAmount || "");
    const valid =
      !parsedAmount.isNaN() &&
      parsedAmount.isInteger() &&
      parsedAmount.isPositive() &&
      parsedAmount.isLessThanOrEqualTo(30);
    if (!valid) {
      throw new Error(
        "Leniency amount must be a positive integer less than or equal to 30"
      );
    }
    return valid;
  };

  const isValidSafetyPeriod = (safetyPeriod?: string) => {
    const parsedAmount = parseAmount(safetyPeriod || "");
    const valid =
      !parsedAmount.isNaN() &&
      parsedAmount.isInteger() &&
      parsedAmount.isPositive() &&
      parsedAmount.isLessThanOrEqualTo(30);
    if (!valid) {
      throw new Error(
        "Safety Period amount must be a positive integer less than or equal to 30"
      );
    }
    return valid;
  };

  const isValidAcceptedCurrencies = (
    acceptedCurrencies: AcceptedCurrency[]
  ) => {
    const valid = acceptedCurrencies.some((currency) => currency.selected);
    if (!valid) {
      throw new Error("At least one currency must be selected");
    }
    return valid;
  };

  const isValidRecurringTimeFrameInterval = (
    recurringTimeFrameInterval?: string
  ) => {
    const valid =
      recurringTimeFrameInterval === "days" ||
      recurringTimeFrameInterval === "weeks" ||
      recurringTimeFrameInterval === "months" ||
      recurringTimeFrameInterval === "years";
    if (!valid) {
      throw new Error(
        "Recurring time frame interval must be days, weeks, months or years"
      );
    }
    return valid;
  };

  const isValidMerchantPayoutAddress = (payoutAddress: string) => {
    let valid: boolean;
    try {
      valid =
        !!fromBech32(payoutAddress) && payoutAddress?.startsWith("orbita1");
    } catch (e) {
      throw new Error(
        "Merchant payout address must be a valid bech32 address starting with 'orbita1'"
      );
    }
    return valid;
  };

  const isValidDirectTx = (payment: CreatePayment) => {
    isValidAcceptedCurrencies(payment.acceptedCurrencies);
    isValidPriceAmount(
      payment.mode,
      payment.paymentAmount,
      payment.paymentCurrency
    );
    isValidPriceCurrency(payment.paymentCurrency);
    isValidMerchantPayoutAddress(payment.paymentAddress);
    isValidPaymentName(payment.paymentName);
    return { success: true, error: "" };
  };

  const isValidSubscriptionTx = (payment: CreatePayment) => {
    isValidAcceptedCurrencies(payment.acceptedCurrencies);
    isValidPriceAmount(
      payment.mode,
      payment.paymentAmount,
      payment.paymentCurrency
    );
    isValidPriceCurrency(payment.paymentCurrency);
    isValidMerchantPayoutAddress(payment.paymentAddress);
    isValidPaymentName(payment.paymentName);
    isValidRecurringTimeFrameAmount(payment.recurringTimeFrame);
    isValidRecurringTimeFrameInterval(payment.recurringTimeFrameInterval);
    if (payment.mode === "business") {
      isValidPaymentLeniency(payment.leniencyAmount);
    }
    return { success: true, error: "" };
  };

  const isValidSafefiTx = (payment: CreatePayment) => {
    isValidAcceptedCurrencies(payment.acceptedCurrencies);
    isValidPriceAmount(
      payment.mode,
      payment.paymentAmount,
      payment.paymentCurrency
    );
    isValidPriceCurrency(payment.paymentCurrency);
    isValidMerchantPayoutAddress(payment.paymentAddress);
    isValidPaymentName(payment.paymentName);
    if (payment.mode === "basic") {
      isValidPaymentLeniency(payment.leniencyAmount);
    }
    isValidSafetyPeriod(payment.safetyPeriodAmount);
    return { success: true, error: "" };
  };

  const isValidTx = (payment: CreatePayment) => {
    const { paymentType } = payment;
    try {
      switch (paymentType) {
        case "direct":
          return isValidDirectTx(payment);
        case "subscription":
          return isValidSubscriptionTx(payment);
        case "safefi":
          return isValidSafefiTx(payment);
        default:
          throw new Error("Invalid payment type");
      }
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const createPayment = async (
    payment: CreatePayment,
    fee?: StdFee,
    memo?: string
  ) => {
    const valid = isValidTx(payment);
    if (!valid.success) {
      throw new Error(valid.error);
    }

    const payload: MsgCreatePayment = {
      creator: address,
      subscriptionType: "Default",
      acceptedPaymentType: payment.acceptedCurrencies
        .filter((c) => c.selected)
        .map((c) => c.currency.toString())
        .join(","),
      name: payment.paymentName,
      priceAmount: payment.paymentAmount,
      priceCurrency: payment.paymentCurrency,
      merchantPayoutAddress: payment.paymentAddress,
      paymentMode: payment.mode,
      paymentType: payment.paymentType,
      recurringTimeFrame:
        payment.recurringTimeFrameInterval?.toUpperCase() || "",
      recurringTimeFrameAmount: Number(payment.recurringTimeFrame || "0"),
      paymentLeniency: Number(payment.leniencyAmount || "3"), //Default to 3
      safetyPeriod: Number(payment.safetyPeriodAmount || "10"), //Default to 10
    };

    const fees = fee || { amount: [], gas: "200000" };

    const result = await CreatePayment(payload, fees, memo);
    return result;
  };

  return {
    createPayment,
    isValidTx,
  };
};
