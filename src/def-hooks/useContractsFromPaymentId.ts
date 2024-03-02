// Get all contracts related to a paymentID

import useOrbitaPay from "@/hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";
import { useMemo } from "react";

export const useContracts = (paymentID: string, pageSize: number) => {
  const { address } = useAddressContext();
  const { QueryContracts } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryContracts(paymentID, "payment", {}, { enabled }, pageSize);
  type HelperContracts = NonNullable<
    NonNullable<Required<typeof query.data>>["pages"][0]["Contract"]
  >;
  const contractsRaw = query.data?.pages.reduce((contracts, page) => {
    if (page.Contract) {
      return contracts.concat(page.Contract);
    } else {
      return contracts;
    }
  }, [] as HelperContracts);
  const contracts = useMemo(() => {
    return {
      contracts: contractsRaw ?? [],
      isLoading: query.isLoading,
    };
  }, [contractsRaw]);
  return {
    contracts,
  };
};
