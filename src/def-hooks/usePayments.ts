// Get all payments of the connected address

import { useMemo } from "react";
import useOrbitaPay from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";

export const usePayments = (perPage: number) => {
  const { address } = useAddressContext();
  const { QueryPayments } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryPayments(address, {}, { enabled }, perPage);
  type HelperPayments = NonNullable<
    NonNullable<Required<typeof query.data>>["pages"][0]["Payment"]
  >;
  const paymentsRaw = query.data?.pages.reduce((subs, page) => {
    if (page.Payment) {
      return subs.concat(page.Payment);
    } else {
      return subs;
    }
  }, [] as HelperPayments);
  const payments = useMemo(() => {
    return {
      payments: paymentsRaw ?? [],
      isLoading: query.isLoading,
    };
  }, [paymentsRaw]);
  return {
    payments,
  };
};
