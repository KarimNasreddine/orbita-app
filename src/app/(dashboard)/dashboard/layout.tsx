"use client";

import ConnectWalletButton from "@/components/ConnectWalletButton";
import MenuOptions from "@/components/ui/nav/MenuOptions";
import Image from "next/image";
import IgntAcc from "../../../components/ui/ignt/IgntAcc";
import { FC } from "react";
import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddressProvider from "@/def-hooks/addressContext";
import WalletProvider from "@/def-hooks/walletContext";
import DenomProvider from "@/def-hooks/denomContext";

interface layoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const layout: FC<layoutProps> = ({ children }: layoutProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddressProvider>
        <WalletProvider>
          <DenomProvider>
            <div className={`w-full flex ${spaceGrotesk.className} relative`}>
              <div className="md: hidden">
                <p>MOBILE MENU LAYOUT</p>
              </div>
              <div className="hidden lg:flex sticky top-0 items-center h-screen max-w-[15rem] grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-red px-6">
                <Image
                  src="/orbita-logo.svg"
                  alt="Orbita Logo"
                  width={600}
                  height={200}
                  className="mt-5"
                />
                <IgntAcc />
                <MenuOptions />
              </div>
              <aside className="container p-8">{children}</aside>
            </div>
          </DenomProvider>
        </WalletProvider>
      </AddressProvider>
    </QueryClientProvider>
  );
};

export default layout;
