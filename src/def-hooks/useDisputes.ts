// Get all disputes of the connected address

import { useMemo } from "react";
import useOrbitaPay from "../hooks/useOrbitaPay";
import { useAddressContext } from "./addressContext";

export const useDisputes = () => {
  const { address } = useAddressContext();
  const { QueryDisputeAll } = useOrbitaPay();
  const enabled = useMemo(() => {
    return address != "";
  }, [address]);

  const queryParams = {
    address: address,
  };
  const options = { enabled: enabled }; // UseQueryOptions or UseInfiniteQueryOptions based on your needs
  const perPage = 10; // Number of disputes to fetch per page

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    QueryDisputeAll(queryParams, options, perPage);

  const disputes = useMemo(() => {
    return {
      disputeAllData: data,
      disputeAllIsLoading: isLoading,
      disputeAllIsError: isError,
      disputeAllFetchNextPage: fetchNextPage,
      disputeAllHasNextPage: hasNextPage,
    };
  }, [data, fetchNextPage, hasNextPage, isError, isLoading]);
  return {
    disputes,
  };
};
