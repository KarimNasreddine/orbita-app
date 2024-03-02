// Get payment by payment ID

import { useMemo } from "react";
import useOrbitaPayments from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";

export const usePayment = (paymentID: string, checkOutDataValid: boolean) => {
  if (!paymentID || !checkOutDataValid) {
    let payment = { payment: undefined, isLoading: false };
    return payment;
  }
  const { address } = useAddressContext();
  const { QueryPayment } = useOrbitaPayments();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryPayment(paymentID, { enabled });
  const payment = useMemo(() => {
    return {
      // @ts-ignore
      payment: query.data?.Payment,
      isLoading: query.isLoading,
    };
  }, [query.data]);
  return {
    payment,
  };
};
