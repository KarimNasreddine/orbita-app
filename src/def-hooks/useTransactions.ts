/* eslint-disable react-hooks/exhaustive-deps */

import { useMemo } from "react";
import useCosmosTxV1Beta1 from "../hooks/useCosmosTxV1Beta1";
import { useAddressContext } from "./addressContext";

export const useTransactions = () => {
  const { address } = useAddressContext();
  const { ServiceGetTxsEvent } = useCosmosTxV1Beta1();
  const SENT_EVENT = `transfer.sender='${address}'`;
  const RECEIVED_EVENT = `transfer.recipient='${address}'`;
  const sentQuery = ServiceGetTxsEvent({ events: SENT_EVENT }, {}, 100);
  const receivedQuery = ServiceGetTxsEvent({ events: RECEIVED_EVENT }, {}, 100);
  type HelperTxs = NonNullable<
    NonNullable<Required<typeof sentQuery.data>>["pages"][0]["tx_responses"]
  >;
  const allSent =
    sentQuery.data?.pages.reduce(
      (txs: string | any[], page: { tx_responses: any }) => {
        if (page.tx_responses) {
          return txs.concat(page.tx_responses);
        } else {
          return txs;
        }
      },
      [] as HelperTxs
    ) ?? ([] as HelperTxs);

  const allReceived =
    receivedQuery.data?.pages.reduce(
      (txs: string | any[], page: { tx_responses: any }) => {
        if (page.tx_responses) {
          return txs.concat(page.tx_responses);
        } else {
          return txs;
        }
      },
      [] as HelperTxs
    ) ?? ([] as HelperTxs);
  const txs = useMemo(() => {
    return allSent
      .map((x: any) => ({ type: "sent", ...x }))
      .concat(
        allReceived.map((x: any) => ({
          type: "received",
          ...x,
        })) ?? []
      )
      .sort((a: { height: any }, b: { height: any }) => {
        return (Number(a.height) ?? 0) < (Number(b.height) ?? 0) ? 1 : -1;
      });
  }, [allSent, allReceived]);
  const transferTxs = useMemo(() => {
    return txs?.filter((x: { tx: any }) =>
      ((x.tx as any)?.body.messages as any[]).some(
        (x) =>
          x["@type"] == "/cosmos.bank.v1beta1.MsgSend" ||
          x["@type"] == "/ibc.applications.transfer.v1.MsgTransfer"
      )
    );
  }, [txs]);
  return {
    txs,
    transferTxs,
    hasMoreSent: sentQuery.hasNextPage,
    hasMoreReceived: receivedQuery.hasNextPage,
    fetchSent: sentQuery.fetchNextPage,
    fetchReceived: receivedQuery.fetchNextPage,
  };
};
