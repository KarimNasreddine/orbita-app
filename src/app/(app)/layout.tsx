"use client";

import MenuOptions from "@/components/ui/nav/MenuOptions";
import { FC, useState } from "react";
import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddressProvider from "@/def-hooks/addressContext";
import WalletProvider from "@/def-hooks/walletContext";
import DenomProvider from "@/def-hooks/denomContext";
import OrbitaLogo from "@/components/ui/logo/OrbitaLogo";
import { FiMenu } from "react-icons/fi";

interface layoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Layout: FC<layoutProps> = ({ children }: layoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AddressProvider>
        <WalletProvider>
          <DenomProvider>
            <div className={`w-full flex ${spaceGrotesk.className} relative`}>
              {!isDrawerOpen && (
                <div className="absolute md:hidden top-0 left-0 sticky z-50">
                  <button
                    className="p-5 text-black"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    <FiMenu size={24} />
                  </button>
                </div>
              )}

              {isDrawerOpen && (
                <div
                  className={`absolute top-0 left-0 min-w-[15rem] w-[15rem] bg-white bg-opacity-95 border-r border-divider-lines min-h-screen h-full p-5 bg-opacity-120 z-40 transform ${
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 md:hidden`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="md:hidden mb-5 text-black"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    X
                  </button>
                  <MenuOptions />
                </div>
              )}

              <div className="hidden md:flex sticky top-0 items-center h-screen w-[20rem] grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-red px-6">
                <OrbitaLogo className="mt-6 mb-4" />
                <MenuOptions />
              </div>
              <aside className="container pl-0 mr-2 md:p-8 my-12">{children}</aside>
            </div>
          </DenomProvider>
        </WalletProvider>
      </AddressProvider>
    </QueryClientProvider>
  );
};

export default Layout;
