import useOrbitaPay from "../hooks/useOrbitaPay";
import { fromBech32 } from "@cosmjs/encoding";
import { StdFee } from "@keplr-wallet/types";
import BigNumber from "bignumber.js";
import { MsgCreateContract } from "../../ts-client/orbita.pay/module";
import { useAddressContext } from "./addressContext";
import { CreateContract } from "@/types/contract";
import { Currency, PaymentCurrency } from "@/types/currency";

export const useCreateContract = () => {
  const { address } = useAddressContext();
  const { CreateContract: createContractMsg } = useOrbitaPay();

  const parseAmount = (amount: string): BigNumber => {
    return amount == "" ? new BigNumber(0) : new BigNumber(amount);
  };

  const isValidTotalAmount = (
    paymentAmount: string,
    paymentCurrency: string
  ) => {
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

  const isValidTotalAmountCurrency = (paymentCurrency: string) => {
    const valid = Object.values(PaymentCurrency as any).includes(
      paymentCurrency
    );
    if (!valid) {
      throw new Error("Payment currency must be BTC, USD, or CAD");
    }
    return valid;
  };

  const isValidPayWithCurrency = (payWithCurrency: string) => {
    const valid = Object.values(Currency as any).includes(payWithCurrency);
    if (!valid) {
      throw new Error("At least one currency must be selected");
    }
    return valid;
  };

  const isValidAddress = (payoutAddress: string) => {
    let valid: boolean;
    try {
      valid =
        !!fromBech32(payoutAddress) && payoutAddress?.startsWith("orbita1");
    } catch (e) {
      throw new Error(
        "Wallet address must be a valid bech32 address starting with 'orbita1'"
      );
    }
    return valid;
  };

  const isValidTx = (contract: CreateContract) => {
    try {
      isValidTotalAmount(contract.totalAmount, contract.totalAmountCurrency);
      isValidTotalAmountCurrency(contract.totalAmountCurrency);
      isValidPayWithCurrency(contract.payWithCurrency);
      isValidAddress(address);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  };

  const createContract = async (
    payload: CreateContract,
    fee?: StdFee,
    memo?: string
  ) => {
    const valid = isValidTx(payload);
    if (!valid.success) {
      throw new Error(valid.error);
    }

    const fees = fee || { amount: [], gas: "200000" };

    const transformedPayload: MsgCreateContract = {
      creator: address,
      clientWalletAddress: address,
      paymentID: payload.paymentID,
      payWithCurrency: payload.payWithCurrency,
      totalAmount: payload.totalAmount,
      totalAmountCurrency: payload.totalAmountCurrency,
    };
    const result = await createContractMsg(transformedPayload, fees, memo);
    return result;
  };

  return {
    createContract,
    isValidTx,
  };
};
