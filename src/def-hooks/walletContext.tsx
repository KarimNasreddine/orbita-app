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
import type { Wallet, WalletDispatch } from "../utils/interfaces";
import useCosmosBaseTendermintV1Beta1 from "@/hooks/useCosmosBaseTendermintV1Beta1";
import ConnectWalletModal from "@/components/ui/modal/ConnectWalletModal";
import useKeplr from "./useKeplr";
import { WalletConnectState } from "@/components/ui/modal/ConnectWalletModal";

interface Props {
  children?: ReactNode;
}

const initialWalletState: Wallet = {
  name: null,
  address: null,
  signature: null,
  publicKey: null,
};

const initialWalletContext = {
  activeWallet: initialWalletState,
  isWalletConnected: false,
};

const initialWalletDispatchContext: WalletDispatch = {
  connectWithKeplr: async () => {},
  signOut: () => {},
};

const WalletContext = createContext(initialWalletContext);
const WalletDispatchContext = createContext(initialWalletDispatchContext);
export const useWalletContext = () => useContext(WalletContext);
export const useDispatchWalletContext = () => useContext(WalletDispatchContext);

export default function WalletProvider({ children }: Props) {
  const [activeWallet, setActiveWallet] = useState<Wallet>(initialWalletState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [walletConnectState, setWalletConnectState] =
    useState<WalletConnectState>("disconnected");
  const client = useClient();
  const query = useCosmosBaseTendermintV1Beta1();
  const nodeInfo = query.ServiceGetNodeInfo({});
  const isWalletConnected = useMemo(
    () => !!activeWallet.address,
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
      setActiveWallet(wallet);
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
    };
    return wallet;
  };

  const signOut = () => {
    client.removeSigner();
    setActiveWallet(initialWalletState);
    setWalletConnectState("disconnected");
  };

  useEffect(() => {
    connectWithKeplr();

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
            signOut={signOut}
          />
        )}
        {children}
      </WalletDispatchContext.Provider>
    </WalletContext.Provider>
  );
}
