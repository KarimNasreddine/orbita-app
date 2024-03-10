import { useMemo } from "react";
import { useAddressContext } from "./addressContext";
import useOrbitaPay from "@/hooks/useOrbitaPay";

export const useContractsFromAccountAddress = (
  accountAddress: string,
  pageSize: number
) => {
  const { address } = useAddressContext();
  const { QueryContracts } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const query = QueryContracts(
    accountAddress,
    "address",
    {},
    { enabled },
    pageSize
  );
  // console.log("query merchant contracts", query.data?.pages[0]?.Contracts);
  type HelperContracts = NonNullable<
    NonNullable<Required<typeof query.data>>["pages"][0]["Contract"]
  >;
  const contractsRaw = query.data?.pages[0]?.Contracts as HelperContracts;
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
