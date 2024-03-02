// Get all contracts of the connected address

import { useMemo } from "react";
import useOrbitaPay from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";

export const useContracts = (perPage: number) => {
  const { address } = useAddressContext();
  const { QueryContractAll } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryContractAll(address, {}, { enabled }, perPage);
  type HelperContracts = NonNullable<
    NonNullable<Required<typeof query.data>>["pages"][0]["Contracts"]
  >;
  const contractsRaw = query.data?.pages.reduce((payments, page) => {
    if (page.Contracts) {
      return payments.concat(page.Contracts);
    } else {
      return payments;
    }
  }, [] as HelperContracts);
  const contracts = useMemo(() => {
    return {
      payments: contractsRaw ?? [],
      isLoading: query.isLoading,
    };
  }, [contractsRaw]);
  return { contracts };
};
