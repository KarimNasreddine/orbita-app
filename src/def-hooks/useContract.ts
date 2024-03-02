// Get contract by ID

import useOrbitaPay from "@/hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";
import { useMemo } from "react";

export const useContract = (contractID: string) => {
  const { address } = useAddressContext();
  const { QueryContract } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const { data, isLoading, isError } = QueryContract(contractID, {
    enabled: enabled,
  });

  const contract = useMemo(() => {
    return {
      contractData: data,
      contractIsLoading: isLoading,
      contractIsError: isError,
    };
  }, [data, isError, isLoading]);
  return {
    contract,
  };
};
