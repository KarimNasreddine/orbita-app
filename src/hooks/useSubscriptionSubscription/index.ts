/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from "../useClient";

export default function useSubscriptionSubscription() {
  const client = useClient();
  const QueryParams = (options: any) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.SubscriptionSubscription.query.queryParams().then((res) => res.data);
      },
      options,
    );
  };

  const QuerySubscription = (id: string, options: any) => {
    const key = { type: "QuerySubscription", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.SubscriptionSubscription.query.querySubscription(id).then((res) => res.data);
      },
      options,
    );
  };

  const QuerySubscriptionAll = (query: any, options: any, perPage: number) => {
    const key = { type: "QuerySubscriptionAll", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .querySubscriptionAll(query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  const QuerySubscriptions = (merchantAddress: string, query: any, options: any, perPage: number) => {
    const key = { type: "QuerySubscriptions", merchantAddress, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { merchantAddress, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .querySubscriptions(merchantAddress, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  const QueryContract = (id: string, options: any) => {
    const key = { type: "QueryContract", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.SubscriptionSubscription.query.queryContract(id).then((res) => res.data);
      },
      options,
    );
  };

  const QueryContractAll = (address: string, query: any, options: any, perPage: number) => {
    const key = { type: "QueryContractAll", address, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { address, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .queryContractAll(address, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  const QueryContracts = (id: string, querytype: string, query: any, options: any, perPage: number) => {
    const key = { type: "QueryContracts", id, querytype, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { id, querytype, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .queryContracts(id, querytype, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  const QueryPayment = (id: string, options: any) => {
    const key = { type: "QueryPayment", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.SubscriptionSubscription.query.queryPayment(id).then((res) => res.data);
      },
      options,
    );
  };

  const QueryPaymentAll = (id: string, querytype: string, query: any, options: any, perPage: number) => {
    const key = { type: "QueryPaymentAll", id, querytype, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { id, querytype, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .queryPaymentAll(id, querytype, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  const QueryDispute = (id: string, options: any) => {
    const key = { type: "QueryDispute", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.SubscriptionSubscription.query.queryDispute(id).then((res) => res.data);
      },
      options,
    );
  };

  const QueryDisputeAll = (query: any, options: any, perPage: number) => {
    const key = { type: "QueryDisputeAll", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.SubscriptionSubscription.query
          .queryDisputeAll(query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if ((lastPage.pagination?.total ?? 0) > (lastPage.pageParam ?? 0) * perPage) {
            return lastPage.pageParam + 1;
          } else {
            return undefined;
          }
        },
        getPreviousPageParam: (firstPage, allPages) => {
          if (firstPage.pageParam == 1) {
            return undefined;
          } else {
            return firstPage.pageParam - 1;
          }
        },
      },
    );
  };

  return {
    QueryParams,
    QuerySubscription,
    QuerySubscriptionAll,
    QuerySubscriptions,
    QueryContract,
    QueryContractAll,
    QueryContracts,
    QueryPayment,
    QueryPaymentAll,
    QueryDispute,
    QueryDisputeAll,
  };
}
