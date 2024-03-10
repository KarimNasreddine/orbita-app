import React, { FC, useMemo } from "react";
import {
  IgntButton,
  IgntExternalArrowIcon,
  IgntKeplrIcon,
  IgntModal,
  IgntSpinner,
  IgntWarningIcon,
} from "@ignt/react-library";
import useKeplr from "@/def-hooks/useKeplr";
import Spinner from "../spinner/Spinner";
import WarningIcon from "../warning/WarningIcon";

export type WalletConnectState = "disconnected" | "error" | "connecting";

type ConnectWalletModalProps = {
  state: WalletConnectState;
  onClose: () => void;
  connectWithKeplr: () => void;
  signOut: () => void;
};

const ConnectWalletModal: FC<ConnectWalletModalProps> = (
  props: ConnectWalletModalProps
) => {
  const { state, onClose, connectWithKeplr, signOut } = props;
  const { isKeplrAvailable } = useKeplr();

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <IgntModal
          visible={true}
          closeIcon={false}
          cancelButton={false}
          submitButton={false}
          className="inline-block bg-white align-bottom rounded-lg text-center overflow-hidden shadow-xl transform transition-all w-full mx-4 sm:mx-0 sm:my-8 sm:align-middle sm:w-[24rem]"
          close={onClose}
          submit={onClose}
          header={
            state === "disconnected" ? (
              <div className="flex items-center flex-col my-3">
                <IgntKeplrIcon className="text-[48px]" />
                {isKeplrAvailable ? (
                  <h3 className="text-2xl font-bold">Connect your wallet</h3>
                ) : (
                  <h3>Install Keplr</h3>
                )}
              </div>
            ) : state === "connecting" ? (
              <div className="flex items-center flex-col my-3">
                <div className="description-grey text-sm">Opening Keplr</div>
                <h3 className="text-2xl font-bold">Connecting</h3>
              </div>
            ) : (
              state === "error" && (
                <div className="flex items-center flex-col my-3">
                  <div className="mb-4">
                    <WarningIcon />
                  </div>
                  <h3 className="text-2xl font-bold">Keplr cannot launch</h3>
                </div>
              )
            )
          }
          body={
            <div className="max-w-xs text-center text-sm my-4 mx-auto">
              {state === "disconnected" ? (
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
              ) : state === "connecting" ? (
                <div>
                  <div className="mt-8 flex justify-center">
                    <Spinner width={10} height={10} />
                  </div>
                  <IgntButton
                    aria-label="Cancel"
                    type="primary"
                    className="mt-10 p-2 border border-black text-white"
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                  >
                    Cancel
                  </IgntButton>
                  <div className="external-link mt-8 text-sm text-gray-500 hover:text-black hover:cursor-pointer">
                    Having trouble opening Keplr?
                  </div>
                </div>
              ) : (
                state === "error" && (
                  <div className="py-4">
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
            state === "disconnected" ? (
              <div className="my-3">
                <IgntButton
                  aria-label="Connect Keplr"
                  type="primary"
                  className="p-2"
                  onClick={connectWithKeplr}
                >
                  <span className="text-white">Connect Keplr</span>
                </IgntButton>
              </div>
            ) : (
              state === "error" && (
                <div className="flex justify-center space-x-10">
                  <IgntButton
                    aria-label="Connect Keplr"
                    type="secondary"
                    className="border border-black p-2"
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                  >
                    Cancel
                  </IgntButton>
                  <IgntButton
                    aria-label="Connect Keplr"
                    type="primary"
                    className="text-white p-2"
                    onClick={connectWithKeplr}
                  >
                    Try again
                  </IgntButton>
                </div>
              )
            )
          }
        />
      </div>
    </div>
  );
};

export default ConnectWalletModal;
