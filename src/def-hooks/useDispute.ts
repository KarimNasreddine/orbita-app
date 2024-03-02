// Get dispute by dispute ID

import { useMemo } from "react";
import useOrbitaPay from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";
export const useDispute = (disputeID: string) => {
  const { address } = useAddressContext();
  const { QueryDispute } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);
  const { data, isLoading, isError } = QueryDispute(disputeID, {
    enabled: enabled,
  });
  const dispute = useMemo(() => {
    return {
      dispute: data?.Dispute,
      isLoading: isLoading,
      isError: isError,
    };
  }, [data, isError, isLoading]);
  return {
    dispute,
  };
};
