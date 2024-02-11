"use client";

import { FC } from "react";
import { connectKeplrWallet } from "@/lib/keplr";

interface ConnectWalletButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const { ...rest } = props;
  return (
    <button
      className="bg-gradient-to-t from-[#fe1cbb] to-[#f3a41c] text-white w-full max-w-[80%] py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none font-bold"
      {...rest}
      onClick={connectKeplrWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
