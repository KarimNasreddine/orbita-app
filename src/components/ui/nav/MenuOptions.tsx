// components/ui/MenuOptions.tsx
"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import MenuOption from "./MenuOption";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const MenuOptions: React.FC = () => {
  const [selected, setSelected] = useState("Dashboard");

  const handleButtonClick = (item: string) => {
    setSelected(item);
  };

  return (
    <div className={`w-full max-w-[80%] ${spaceGrotesk.className} text-md`}>
      <div className={`flex flex-col gap-3 mb-10 mt-5`}>
        <MenuOption
          href="/dashboard/create"
          onClick={() => handleButtonClick("Create")}
          isSelected={selected === "Create"}
        >
          Create
        </MenuOption>
        <MenuOption
          href="/dashboard/manage"
          onClick={() => handleButtonClick("Manage")}
          isSelected={selected === "Manage"}
        >
          Manage
        </MenuOption>
        <MenuOption
          href="/dashboard/manual-pay"
          onClick={() => handleButtonClick("Manual Pay")}
          isSelected={selected === "Manual Pay"}
        >
          Manual Pay
        </MenuOption>
        <MenuOption
          href="/dashboard/holdings"
          onClick={() => handleButtonClick("Holdings")}
          isSelected={selected === "Holdings"}
        >
          Holdings
        </MenuOption>
        <MenuOption
          href="/dashboard/airdrop"
          onClick={() => handleButtonClick("Airdrop")}
          isSelected={selected === "Airdrop"}
        >
          Airdrop
        </MenuOption>
      </div>
      <div className={`flex flex-col gap-3 mb-10`}>
        <MenuOption
          href="/dashboard"
          onClick={() => handleButtonClick("Dashboard")}
          isSelected={selected === "Dashboard"}
        >
          Dashboard
        </MenuOption>
        <MenuOption
          href="/dashboard/orbita-alerts"
          onClick={() => handleButtonClick("Orbita Alerts")}
          isSelected={selected === "Orbita Alerts"}
        >
          Orbita Alerts
        </MenuOption>
        <MenuOption
          href="/dashboard/safefi-disputes"
          onClick={() => handleButtonClick("SafeFi Disputes")}
          isSelected={selected === "SafeFi Disputes"}
        >
          SafeFi Disputes
        </MenuOption>
      </div>
      <div className={`flex flex-col gap-3`}>
        <MenuOption
          href="/dashboard/ecosystem"
          onClick={() => handleButtonClick("Ecosystem")}
          isSelected={selected === "Ecosystem"}
        >
          Ecosystem
        </MenuOption>
      </div>
    </div>
  );
};

export default MenuOptions;
