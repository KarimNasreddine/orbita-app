"use client";

// Full Keplr implementation not done yet

import useKeplr from "@/def-hooks/useKeplr";
import { FC, useEffect } from "react";

interface ConnectWalletButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const { ...rest } = props;

  const { connectToKeplr } = useKeplr();

  const tryToConnectToKeplr = (): void => {
    const onKeplrConnect = (): void => {
      console.log("Keplr connected");
    };

    const onKeplrError = (): void => {
      console.log("Keplr error");
    };

    connectToKeplr(onKeplrConnect, onKeplrError);
  };

  useEffect(() => {
    tryToConnectToKeplr();
  }, []);

  return (
    <button
      className="bg-gradient-to-t from-[#fe1cbb] to-[#f3a41c] text-white w-full max-w-[80%] py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none font-bold"
      {...rest}
      // onClick={connectToKeplr}
    >
      Connect Wallet
    </button>
    // <IgntAcc />
  );
};

export default ConnectWalletButton;
