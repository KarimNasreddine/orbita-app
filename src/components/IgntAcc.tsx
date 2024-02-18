/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from "react";
import useKeplr from "../def-hooks/useKeplr";
import { useAddressContext } from "../def-hooks/addressContext";
import {
  useDispatchWalletContext,
  useWalletContext,
} from "../def-hooks/walletContext";
import { useClient } from "../hooks/useClient";

import useCosmosBaseTendermintV1Beta1 from "../hooks/useCosmosBaseTendermintV1Beta1";
import { Wallet } from "../utils/interfaces";
import {
  IgntProfileIcon,
  IgntWarningIcon,
  IgntKeplrIcon,
  IgntButton,
  IgntModal,
  IgntExternalArrowIcon,
  IgntSpinner,
} from "@ignt/react-library";
import IgntAccDropdown from "./IgntAccDropdown";

export interface State {
  modalPage: string;
  connectWalletModal: boolean;
  accountDropdown: boolean;
  keplrParams: { name: string; bech32Address: string };
}

export default function IgntAcc() {
  const { connectToKeplr, isKeplrAvailable, getKeplrAccParams } = useKeplr();

  const client = useClient();
  const walletStore = useWalletContext();
  const walletActions = useDispatchWalletContext();
  // methods
  const wallet = walletStore.activeWallet;
  //console.log("In IgntAcc.tsx. After wallet assigned!!!. wallet=", wallet);
  const query = useCosmosBaseTendermintV1Beta1();
  const nodeInfo = query.ServiceGetNodeInfo({});
  const chainId = nodeInfo.data?.default_node_info?.network ?? "";
  const { address } = useAddressContext();

  const initialState: State = {
    modalPage: "connect",
    connectWalletModal: false,
    accountDropdown: false,
    keplrParams: { name: "", bech32Address: "" },
  };

  const [state, setState] = useState(initialState);
  useEffect(() => {
    //console.log("useEffect in IgntAcc.tsx!!!");
    const getKeplrData = async () => {
      const { name, bech32Address } = await getKeplrAccParams(chainId);
      const keplrParams = { name, bech32Address };
      setState((oldState) => ({ ...oldState, keplrParams }));
    };
    if (chainId != "" && address) {
      getKeplrData().catch(console.error);
    }
  }, [chainId, address]);
  const tryToConnectToKeplr = (): void => {
    //console.log("tryToConnectToKeplr in IgntAcc.tsx!!!");

    setState((oldState) => ({ ...oldState, modalPage: "connect" }));

    const onKeplrConnect = (): void => {
      setState((oldState) => ({
        ...oldState,
        connectWalletModal: false,
        modalPage: "connect",
      }));
    };

    const onKeplrError = (): void => {
      setState((oldState) => ({ ...oldState, modalPage: "error" }));
    };

    connectToKeplr(onKeplrConnect, onKeplrError);
  };

  const getAccName = (): string => {
    if (client.signer) {
      return state.keplrParams.name;
    } else {
      return "";
    }
  };
  const disconnect = (): void => {
    //console.log("Disconnecting wallet!!!!!!!!")
    setState((oldState) => ({ ...oldState, accountDropdown: false }));
    walletActions.signOut();
  };

  return (
    <>
      <div className="flex justify-center">
        {wallet ? (
          <button
            className={
              "w-full shadow-std acc-dd-btn cursor-pointer flex justify-center items-center p-2 gradient-border-button border border-custom-purple hover:glowing-effect-purple rounded-lg hover:bg-gray-500 text-sm font-bold " +
              (state.accountDropdown ? "active" : "")
            }
            onClick={() => {
              setState((oldState) => ({
                ...oldState,
                accountDropdown: !oldState.accountDropdown,
              }));
            }}
            id={"signInButton1"}
          >
            <IgntProfileIcon address={state.keplrParams?.bech32Address} />
            <span className="mx-2 text-white" id="signInButton2">
              {getAccName()}
            </span>
          </button>
        ) : (
          <IgntButton
            className="gradient-bg-button transform transition border duration-300 hover:scale-110 rounded cursor-pointer p-3 w-full"
            type="primary"
            onClick={() => {
              setState((oldState) => ({
                ...oldState,
                connectWalletModal: true,
              }));
            }}
          >
            <span className="text-l text-white text-center whitespace-nowrap">
              Connect Wallet
            </span>
          </IgntButton>
        )}
        <IgntModal
          visible={state.connectWalletModal}
          closeIcon={false}
          cancelButton={false}
          submitButton={false}
          className="text-center"
          close={() => {
            setState((oldState) => ({
              ...oldState,
              connectWalletModal: false,
            }));
          }}
          submit={() => {
            setState((oldState) => ({
              ...oldState,
              connectWalletModal: false,
            }));
          }}
          header={
            state.modalPage === "connect" ? (
              <div className="flex items-center flex-col my-3">
                <IgntKeplrIcon className="text-[48px]" />
                {isKeplrAvailable ? (
                  <h3 className="text-2xl font-bold">Connect your wallet</h3>
                ) : (
                  <h3>Install Keplr</h3>
                )}
              </div>
            ) : state.modalPage === "connecting" ? (
              <div className="flex items-center flex-col my-3">
                <div className="description-grey text-sm">Opening Keplr</div>
                <h3 className="text-2xl font-bold">Connecting</h3>
              </div>
            ) : (
              state.modalPage === "error" && (
                <div className="flex items-center flex-col my-3">
                  <IgntWarningIcon className="mb-4" />
                  <h3 className="text-2xl font-bold">Keplr cannot launch</h3>
                </div>
              )
            )
          }
          body={
            <div className="max-w-xs text-center text-sm my-4 mx-auto">
              {state.modalPage === "connect" ? (
                <div>
                  {isKeplrAvailable ? (
                    <p>
                      Connect your Keplr wallet via the Keplr browser extension
                      to use this app.
                    </p>
                  ) : (
                    <p>
                      Install & connect your Keplr wallet via the Keplr browser
                      extension to use this app.
                    </p>
                  )}
                </div>
              ) : state.modalPage === "connecting" ? (
                <div>
                  <div className="mt-8 flex justify-center">
                    <IgntSpinner />
                  </div>
                  <IgntButton
                    aria-label="Cancel"
                    type="secondary"
                    className="mt-12"
                    onClick={() =>
                      setState((oldState) => ({
                        ...oldState,
                        modalPage: "connect",
                      }))
                    }
                  >
                    Cancel
                  </IgntButton>
                  <div className="external-link mt-8 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
                    Having trouble opening Keplr?
                  </div>
                </div>
              ) : (
                state.modalPage === "error" && (
                  <div className="py-5">
                    <div className="flex items-center justify-center">
                      <span>Keplr troubleshooting</span>
                      <IgntExternalArrowIcon className="ml-1" />
                    </div>
                  </div>
                )
              )}
            </div>
          }
          footer={
            state.modalPage === "connect" ? (
              <div className="my-3">
                <IgntButton
                  aria-label="Connect Keplr"
                  type="primary"
                  onClick={tryToConnectToKeplr}
                >
                  <span className="text-white">Connect Keplr</span>
                </IgntButton>
              </div>
            ) : (
              state.modalPage === "error" && (
                <div className="flex justify-center gap-[10px]">
                  <IgntButton
                    aria-label="Connect Keplr"
                    type="secondary"
                    onClick={() =>
                      setState((oldState) => ({
                        ...oldState,
                        connectWalletModal: false,
                      }))
                    }
                  >
                    Cancel
                  </IgntButton>
                  <IgntButton
                    aria-label="Connect Keplr"
                    type="primary"
                    onClick={() =>
                      setState((oldState) => ({
                        ...oldState,
                        modalPage: "connect",
                      }))
                    }
                  >
                    Try again
                  </IgntButton>
                </div>
              )
            )
          }
        />
      </div>
      {state.accountDropdown && (
        <div className="w-full flex">
          <IgntAccDropdown
            wallet={wallet as Wallet}
            accName={getAccName()}
            disconnect={disconnect}
            close={() => {
              setState((oldState) => ({ ...oldState, accountDropdown: false }));
            }}
          />
        </div>
      )}
    </>
  );
}
