"use client";

import { useAddressContext } from "@/def-hooks/addressContext";
import {
  useDispatchWalletContext,
  useWalletContext,
} from "@/def-hooks/walletContext";
import { FC, useState } from "react";
import IgntAccDropdown from "../ignt/IgntAccDropdown";
import ProfileIcon from "../profileIcon/ProfileIcon";

const ConnectWalletButton: FC = () => {
  const { activeWallet, isWalletConnected } = useWalletContext();
  const { shortAddress } = useAddressContext();
  const { connectWithKeplr, signOut } = useDispatchWalletContext();
  const [accountDropdown, setAccountDropdown] = useState(false);

  return (
    <div>
      {isWalletConnected ? (
        <button
          className={
            "w-full cursor-pointer flex justify-center items-center p-2 border border-orbita-pink rounded-lg hover:border-white hover:bg-gradient-to-t from-orbita-pink to-orbita-light-orange hover:text-white text-sm text-black font-bold "
          }
          onClick={() => {
            setAccountDropdown(!accountDropdown);
          }}
          id={"signInButton1"}
        >
          {/* <ProfileIcon width={32} address={shortAddress} /> */}
          <span className="mx-2" id="signInButton2">
            {activeWallet?.name || ""}
          </span>
        </button>
      ) : (
        <button
          className="bg-gradient-pink-orange transform transition border-none duration-300 hover:scale-101 rounded-lg cursor-pointer p-2 w-full"
          onClick={connectWithKeplr}
        >
          <span className="text-l text-white text-center whitespace-nowrap">
            Connect Wallet
          </span>
        </button>
      )}
      {accountDropdown && (
        <div className="relative">
          <IgntAccDropdown
            wallet={activeWallet}
            accName={activeWallet?.name || ""}
            disconnect={signOut}
            close={() => {
              setAccountDropdown(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
