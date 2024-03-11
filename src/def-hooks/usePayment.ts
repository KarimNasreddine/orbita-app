// Get payment by payment ID

import { useMemo } from "react";
import useOrbitaPayments from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";

export const usePayment = (paymentID: string, checkOutDataValid: boolean) => {
  const { address } = useAddressContext();
  const { QueryPayment } = useOrbitaPayments();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryPayment(paymentID, { enabled });
  const payment = useMemo(() => {
    return {
      payment: query.data?.Payment,
      isLoading: query.isLoading,
    };
  }, [query.data, query.isLoading]);

  if (!paymentID || !checkOutDataValid) {
    const payment = { payment: undefined, isLoading: false };
    return payment;
  }

  return {
    payment,
  };
};
