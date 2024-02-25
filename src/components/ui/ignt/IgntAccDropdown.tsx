/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCosmosBaseTendermintV1Beta1 from "../../../hooks/useCosmosBaseTendermintV1Beta1";
import { useConnectionStatus } from "../../../def-hooks/useConnectionStatus";
import {
  useClipboard,
  IgntProfileIcon,
  IgntCopyIcon,
  IgntChevronRightIcon,
  IgntExternalArrowIcon,
} from "@ignt/react-library";
import { useAddressContext } from "../../../def-hooks/addressContext";
import { Wallet } from "../../../utils/interfaces";
import { useEffect, useRef, useState } from "react";

interface IgntAccDropdownProps {
  wallet: Wallet;
  accName: string;
  disconnect: () => void;
  close: () => void;
}

enum UI_STATE {
  "DEFAULT" = 1,

  "SETTINGS" = 2,
}

interface State {
  currentUIState: UI_STATE;
}

const initialState: State = {
  currentUIState: UI_STATE.DEFAULT,
};
export default function IgntAccDropdown(props: IgntAccDropdownProps) {
  const [state, setState] = useState(initialState);
  const query = useCosmosBaseTendermintV1Beta1();
  const nodeInfo = query.ServiceGetNodeInfo({});
  const { address, shortAddress } = useAddressContext();
  const ref = useRef<HTMLDivElement>(null);
  const { apiConnected, rpcConnected, wsConnected } = useConnectionStatus();

  const copy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(targetElement) &&
        targetElement.id !== "signInButton1" &&
        targetElement.id !== "signInButton2"
      ) {
        props.close();
        setState((oldState) => ({
          ...oldState,
          currentUIState: UI_STATE.DEFAULT,
        }));
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div className="relative w-full">
      <div
        className={`shadow-std bg-black text-white border border-custom-purple rounded absolute max-w-xs p-7 z-50 w-full box-border acc-dd`}
        ref={ref}
      >
        <span className="text-sm leading-normal text-gray-660 mb-3 block text-[13px]">
          Connected wallet
        </span>
        <div className="mb-3 flex items-center">
          <IgntProfileIcon address={address} />
          <div className="lg:flex flex-wrap flex-col ml-3">
            <span className="text-[13px] font-bold">{props.accName}</span>
            <span
              className="text-[13px] leading-normal text-gray-660 copy-address flex items-center"
              title="Copy address"
              onClick={() => copy(address)}
            >
              {shortAddress}
              <IgntCopyIcon className="ml-2 cursor-pointer hover:text-black" />
            </span>
          </div>
        </div>
        <div
          className="flex justify-between items-center cursor-pointer hover:text-gray-660"
          onClick={() => props.disconnect()}
        >
          <span> Disconnect wallet </span>
        </div>
        <hr className="divide-y my-3 -mx-7 border border-custom-purple" />
        <div
          className="flex justify-between items-center cursor-pointer hover:text-gray-660"
          onClick={() => {
            setState((oldState) => ({
              ...oldState,
              currentUIState:
                oldState.currentUIState === UI_STATE.SETTINGS
                  ? UI_STATE.DEFAULT
                  : UI_STATE.SETTINGS,
            }));
          }}
        >
          <span> Settings </span>
          <IgntChevronRightIcon className="text-sm" />
        </div>
        <hr className="divide-y my-3 -mx-7 border border-custom-purple" />
        <a
          href="#"
          className="flex justify-between items-center mb-3 cursor-pointer hover:text-gray-660"
        >
          <span> Support </span>
          <IgntExternalArrowIcon className="text-xs" />
        </a>
        <a
          href="#"
          className="flex justify-between items-center mb-3 cursor-pointer hover:text-gray-660"
        >
          <span> Twitter </span>
          <IgntExternalArrowIcon className="text-xs" />
        </a>
        <a
          href="#"
          className="flex justify-between items-center mb-3 cursor-pointer hover:text-gray-660"
        >
          <span> Telegram </span>
          <IgntExternalArrowIcon className="text-xs" />
        </a>
        <div className="text-center mt-4">
          <a
            href="#"
            className="text-sm leading-normal text-gray-660 terms-link mr-2 cursor-pointer"
          >
            Privacy
          </a>
          •
          <a
            href="#"
            className="text-sm leading-normal text-gray-660 terms-link mr-2 ml-1 cursor-pointer"
          >
            Terms of use
          </a>
          •
          <a
            href="#"
            className="text-sm leading-normal text-gray-660 terms-link ml-1 cursor-pointer"
          >
            Cookies
          </a>
        </div>
        {state.currentUIState === UI_STATE.SETTINGS && (
          <div
            className={`top-0 left-0 lg:left-full shadow-std bg-black border border-custom-purple text-white rounded absolute max-w-xs p-3 z-50 w-full box-border acc-dd`}
          >
            <header className="flex items-center  px-3 pt-3 pb-7">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setState((oldState) => ({
                    ...oldState,
                    currentUIState: UI_STATE.DEFAULT,
                  }));
                }}
              >
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5 10L1 10M1 10L9.53125 19M1 10L9.53125 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xl font-semibold text-center text-white flex-1">
                Settings
              </div>
            </header>

            <div className="lg:flex flex-wrap justify-between items-center text-white mb-3">
              <span className="pr-3"> Chain </span>
              <span> {nodeInfo.data?.default_node_info?.network ?? ""} </span>
            </div>
            <hr className="divide-y -mx-3 border border-custom-purple mb-2" />

            <div className="lg:flex flex-wrap justify-between text-white items-center mb-3">
              <span className="pr-3"> Cosmos SDK API </span>
              <span> {apiConnected ? "connected" : "disconnected"} </span>
            </div>
            <hr className="divide-y -mx-3 border border-custom-purple mb-2" />

            <div className="lg:flex flex-wrap justify-between text-white items-center mb-3">
              <span className="pr-3"> Tendermint RPC </span>
              <span> {rpcConnected ? "connected" : "disconnected"} </span>
            </div>
            <hr className="divide-y -mx-3 border border-custom-purple mb-2" />

            <div className="lg:flex flex-wrap justify-between text-white items-center">
              <span className="pr-3">WebSocket</span>
              <span> {wsConnected ? "connected" : "disconnected"} </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
