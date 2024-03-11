"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useClient } from "../hooks/useClient";
import type { Nullable, Wallet, WalletDispatch } from "../utils/interfaces";
import useCosmosBaseTendermintV1Beta1 from "@/hooks/useCosmosBaseTendermintV1Beta1";
import ConnectWalletModal from "@/components/ui/modal/ConnectWalletModal";
import useKeplr from "./useKeplr";
import { WalletConnectState } from "@/components/ui/modal/ConnectWalletModal";

interface Props {
  children?: ReactNode;
}

function getWalletFromLocalStorage(): Wallet | null {
  const key = "wallet";
  if (typeof window !== "undefined") {
    const walletStr = window?.localStorage?.getItem(key);
    if (!walletStr) {
      return null;
    }
    try {
      const wallet = JSON.parse(walletStr) as Wallet;
      const now = new Date();
      if (now.getTime() > wallet.expiry) {
        window.localStorage.removeItem(key);
        return null;
      } else return wallet;
    } catch (e) {
      return null;
    }
  }
  return null;
}

const WalletContext = createContext(
  {} as {
    activeWallet: Nullable<Wallet>;
    isWalletConnected: boolean;
  }
);
const WalletDispatchContext = createContext({} as WalletDispatch);

export const useWalletContext = () => useContext(WalletContext);
export const useDispatchWalletContext = () => useContext(WalletDispatchContext);

export default function WalletProvider({ children }: Props) {
  const [activeWallet, setActiveWallet] = useState<Nullable<Wallet>>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walletConnectState, setWalletConnectState] =
    useState<WalletConnectState>("disconnected");
  const client = useClient();
  const query = useCosmosBaseTendermintV1Beta1();
  const nodeInfo = query.ServiceGetNodeInfo({});
  const isWalletConnected = useMemo(
    () => !!activeWallet?.address,
    [activeWallet]
  );
  const { isKeplrAvailable } = useKeplr();

  const connectWithKeplr = async () => {
    setIsModalVisible(true);
    setWalletConnectState("disconnected");
    try {
      await client.useKeplr();
      const [account] = (await client.signer?.getAccounts()) || [];
      const address = account?.address;

      setWalletConnectState("connecting");
      const wallet = await signArbitraryData(address);
      updateWallet(wallet);
      setIsModalVisible(false);
    } catch (e) {
      console.error("Error connecting to Keplr", e);
      setWalletConnectState("error");
    }
  };

  const signArbitraryData = async (address: string): Promise<Wallet> => {
    if (!isKeplrAvailable) throw new Error("Keplr not found");
    const message = "Initiate Orbita Session";

    const chainId = nodeInfo.data?.default_node_info?.network ?? "Orbita";
    const signature = await window.keplr.signArbitrary(
      chainId,
      address,
      message
    );
    const { name } = await window.keplr.getKey(chainId);
    const wallet: Wallet = {
      name,
      address,
      signature: signature.signature,
      publicKey: signature.pub_key.value,
      expiry: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    };
    return wallet;
  };

  const updateWallet = (wallet: Wallet | null) => {
    setActiveWallet(wallet);
    wallet
      ? window.localStorage.setItem("wallet", JSON.stringify(wallet))
      : window.localStorage.removeItem("wallet");
  };

  const signOut = () => {
    client.removeSigner();
    updateWallet(null);
    setWalletConnectState("disconnected");
  };

  useEffect(() => {
    const walletFromLocalStorage = getWalletFromLocalStorage();
    setActiveWallet(walletFromLocalStorage);
    if (walletFromLocalStorage === null) connectWithKeplr();

    window.addEventListener("keplr_keystorechange", connectWithKeplr);

    return () => {
      window.removeEventListener("keplr_keystorechange", connectWithKeplr);
    };
  }, []);

  return (
    <WalletContext.Provider value={{ activeWallet, isWalletConnected }}>
      <WalletDispatchContext.Provider value={{ connectWithKeplr, signOut }}>
        {isModalVisible && (
          <ConnectWalletModal
            state={walletConnectState}
            onClose={() => setIsModalVisible(false)}
            connectWithKeplr={connectWithKeplr}
          />
        )}
        {children}
      </WalletDispatchContext.Provider>
    </WalletContext.Provider>
  );
}
