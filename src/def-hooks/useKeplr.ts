"use client";

/* eslint-disable import/no-anonymous-default-export */
import { useClient } from "../hooks/useClient";
import { useDispatchWalletContext } from "./walletContext";

export default function () {
  const client = useClient();
  const walletStore = useDispatchWalletContext();

  const connectToKeplr = async (
    onSuccessCb: () => void,
    onErrorCb: () => void
  ) => {
    try {
      walletStore.connectWithKeplr();
      onSuccessCb();
    } catch (e) {
      console.error(e);
      onErrorCb();
    }
  };

  const isKeplrAvailable =
    typeof window !== "undefined" ? !!window.keplr : false;

  const getOfflineSigner = (chainId: string) =>
    window?.keplr?.getOfflineSigner(chainId);

  const getKeplrAccParams = async (chainId: string) =>
    await window?.keplr?.getKey(chainId);

  const listenToAccChange = (cb: EventListener) => {
    client.on("signer-changed", cb);
  };

  return {
    connectToKeplr,
    isKeplrAvailable,
    getOfflineSigner,
    getKeplrAccParams,
    listenToAccChange,
  };
}
