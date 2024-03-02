// Update dispute by dispute ID and verdict

import {
  Amount,
  State_UpdateDispute,
  UI_STATE_DISPUTE,
  UI_STATE_PAYMENT,
} from "@/utils/interfaces";
import { useAddressContext } from "./addressContext";
import { useClient } from "@/hooks/useClient";
import { useState } from "react";

const initialState: State_UpdateDispute = {
  tx: {
    creator: "",
    disputeID: "",
    verdict: "",
    memo: "",
    fees: [],
  },
  currentUIState: UI_STATE_DISPUTE.SEND,
  modalOpen: false,
  notification: false,
};

export const useUpdateDispute = async (disputeID: string, verdict: string) => {
  const { address } = useAddressContext();
  const client = useClient();
  const [state, setState] = useState<State_UpdateDispute>(initialState);

  const fee: Array<Amount> = state.tx.fees.map((x) => ({
    denom: x.denom,
    amount: x.amount == "" ? "0" : x.amount,
  }));

  const memo = state.tx.memo;

  setState((oldState) => ({
    ...oldState,
    currentUIState: UI_STATE_DISPUTE.TX_SIGNING,
  }));

  const sendMsgUpdateDispute = client.OrbitaPay.tx.sendMsgUpdateDispute;
  let payload: any = {
    creator: address,
    disputeID: state.tx.disputeID,
    verdict: state.tx.verdict,
    id: 0,
  };
  let send = () =>
    sendMsgUpdateDispute({
      value: payload,
      fee: { amount: fee as Readonly<Amount[]>, gas: "200000" },
      memo,
    });
  const txResult = await send();
  if (txResult.code) {
    throw new Error();
  }
};
