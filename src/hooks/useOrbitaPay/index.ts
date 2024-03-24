/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useQuery,
  type UseQueryOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useClient } from "../useClient";
import { MsgCreateContract, MsgCreatePayment } from "ts-client/orbita.pay/module";
import { StdFee } from "@keplr-wallet/types";

export default function useOrbitaPay() {
  const client = useClient();
  const QueryParams = (options: any) => {
    const key = { type: "QueryParams" };
    return useQuery(
      [key],
      () => {
        return client.OrbitaPay.query.queryParams().then((res) => res.data);
      },
      options
    );
  };

  const QueryPayment = (id: string, options: any) => {
    const key = { type: "QueryPayment", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.OrbitaPay.query.queryPayment(id).then((res) => res.data);
      },
      options
    );
  };

  const QueryPaymentAll = (query: any, options: any, perPage: number) => {
    const key = { type: "QueryPaymentAll", query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.OrbitaPay.query
          .queryPaymentAll(query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const QueryPayments = (
    merchantAddress: string,
    query: any,
    options: any,
    perPage: number
  ) => {
    const key = { type: "QueryPayments", merchantAddress, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { merchantAddress, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.OrbitaPay.query
          .queryPayments(merchantAddress, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const QueryContract = (id: string, options: any) => {
    const key = { type: "QueryContract", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.OrbitaPay.query.queryContract(id).then((res) => res.data);
      },
      options
    );
  };

  const QueryContractAll = (
    address: string,
    query: any,
    options: any,
    perPage: number
  ) => {
    const key = { type: "QueryContractAll", address, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { address, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.OrbitaPay.query
          .queryContractAll(address, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const QueryContracts = (
    id: string,
    querytype: string,
    query: any,
    options: any,
    perPage: number
  ) => {
    const key = { type: "QueryContracts", id, querytype, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { id, querytype, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.OrbitaPay.query
          .queryContracts(id, querytype, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const QuerySubscriptionPayment = (id: string, options: any) => {
    const key = { type: "QuerySubscriptionPayment", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.OrbitaPay.query
          .querySubscriptionPayment(id)
          .then((res) => res.data);
      },
      options
    );
  };

  const QuerySubscriptionPaymentAll = (
    id: string,
    querytype: string,
    query: any,
    options: any,
    perPage: number
  ) => {
    const key = { type: "QuerySubscriptionPaymentAll", id, querytype, query };
    return useInfiniteQuery(
      [key],
      ({ pageParam = 1 }: { pageParam?: number }) => {
        const { id, querytype, query } = key;

        query["pagination.limit"] = perPage;
        query["pagination.offset"] = (pageParam - 1) * perPage;
        query["pagination.count_total"] = true;
        return client.OrbitaPay.query
          .querySubscriptionPaymentAll(id, querytype, query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const QueryDispute = (id: string, options: any) => {
    const key = { type: "QueryDispute", id };
    return useQuery(
      [key],
      () => {
        const { id } = key;
        return client.OrbitaPay.query.queryDispute(id).then((res) => res.data);
      },
      options
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
        return client.OrbitaPay.query
          .queryDisputeAll(query ?? undefined)
          .then((res) => ({ ...res.data, pageParam }));
      },
      {
        ...options,
        getNextPageParam: (lastPage, allPages) => {
          if (
            (Number(lastPage.pagination?.total) ?? 0) >
            (lastPage.pageParam ?? 0) * perPage
          ) {
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
      }
    );
  };

  const CreatePayment = async (
    value: MsgCreatePayment,
    fee?: StdFee,
    memo?: string
  ) => {
    const result = await client.OrbitaPay.tx.sendMsgCreatePayment({
      value,
      fee,
      memo,
    });
    if (result.code) {
      throw new Error(result.rawLog);
    }
    return result;
  };

  const CreateContract = async (
    value: MsgCreateContract,
    fee?: StdFee,
    memo?: string
  ) => {
    const result = await client.OrbitaPay.tx.sendMsgCreateContract({
      value,
      fee,
      memo,
    });
    if (result.code) {
      throw new Error(result.rawLog);
    }
    return result;
  };

  return {
    QueryParams,
    QueryPayment,
    QueryPaymentAll,
    QueryPayments,
    QueryContract,
    QueryContractAll,
    QueryContracts,
    QuerySubscriptionPayment,
    QuerySubscriptionPaymentAll,
    QueryDispute,
    QueryDisputeAll,
    CreatePayment,
    CreateContract
  };
}
