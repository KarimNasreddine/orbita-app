// components/ui/MenuOptions.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import MenuOption from "./MenuOption";
import { usePathname, useRouter } from "next/navigation";
import ConnectWalletButton from "../button/ConnectWalletButton";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const menuItems1 = [
  { name: "Create", href: "/create" },
  { name: "Manage", href: "/manage" },
  { name: "Manual Pay", href: "/manual-pay" },
  { name: "Holdings", href: "/holdings" },
  { name: "Airdrop", href: "/airdrop" },
];

const menuItems2 = [
  { name: "Dashboard", href: "/" },
  { name: "Orbita Alerts", href: `${process.env.alertAppURL}` },
  { name: "SafeFi Disputes", href: "/safefi-disputes" },
];

const menuItems3 = [{ name: "Ecosystem", href: "/ecosystem" }];

const MenuOptions: React.FC = () => {
  const [selected, setSelected] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    // Sort menuItems by href length in descending order and find the selected item
    const selectedItem =
      [...menuItems1, ...menuItems2, ...menuItems3]
        .sort((a, b) => b.href.length - a.href.length)
        .find((item) => pathname.startsWith(item.href))?.name || "";
    setSelected(selectedItem);
  }, [pathname]);

  const handleButtonClick = (item: string) => {
    setSelected(item);
  };

  return (
    <div className={`w-full max-w-[80%] ${spaceGrotesk.className} text-md`}>
      <ConnectWalletButton />
      <div className={`flex flex-col gap-3 mb-10 mt-5`}>
        {menuItems1.map((item) => (
          <MenuOption
            key={item.name}
            href={item.href}
            onClick={() => handleButtonClick(item.name)}
            isSelected={selected === item.name}
          >
            {item.name}
          </MenuOption>
        ))}
      </div>
      <div className={`flex flex-col gap-3 mb-10`}>
        {menuItems2.map((item) => (
          <MenuOption
            key={item.name}
            href={item.href}
            onClick={() => handleButtonClick(item.name)}
            isSelected={selected === item.name}
          >
            {item.name}
          </MenuOption>
        ))}
      </div>
      <div className={`flex flex-col gap-3`}>
        {menuItems3.map((item) => (
          <MenuOption
            key={item.name}
            href={item.href}
            onClick={() => handleButtonClick(item.name)}
            isSelected={selected === item.name}
          >
            {item.name}
          </MenuOption>
        ))}
      </div>
    </div>
  );
};

export default MenuOptions;
