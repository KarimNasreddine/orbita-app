import ConnectWalletButton from "@/components/ui/ConnectWalletButton";
import MenuOption from "@/components/ui/MenuOption";
import MenuOptions from "@/components/ui/MenuOptions";
import Image from "next/image";
import { FC } from "react";
import { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { Metadata } from "next";

interface layoutProps {
  children: ReactNode;
}

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const layout: FC<layoutProps> = ({ children }: layoutProps) => {
  return (
    <div className={`w-full flex h-screen ${spaceGrotesk.className}`}>
      <div className="md: hidden">
        <p>MOBILE MENU LAYOUT</p>
      </div>
      <div className="hidden md:flex items-center h-full w-full max-w-[15rem] grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-red px-6">
        <Image
          src="/orbita-logo.svg"
          alt="Orbita Logo"
          width={200}
          height={200}
          className="mt-5"
        />
        <ConnectWalletButton />
        <MenuOptions />
      </div>
      <aside className="max-h-screen container p-8 w-full">{children}</aside>
    </div>
  );
};

export default layout;
