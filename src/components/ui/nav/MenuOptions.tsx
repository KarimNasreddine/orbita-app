// components/ui/MenuOptions.tsx
"use client";

import React, { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const menuItems1 = ["Create", "Manage", "Manual Pay", "Holdings", "Airdrop"];

const menuItems2 = ["Dashboard", "Orbita Alerts", "SafeFi Disputes"];

const menuItems3 = ["Ecosystem"];

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const MenuOptions = () => {
  const [selected, setSelected] = useState(menuItems1[0]); // Initialize with the first item as selected

  const handleButtonClick = (item: string) => {
    setSelected(item); // Set the clicked item as selected
  };

  return (
    <div className="w-full max-w-[80%] ${spaceGrotesk.className} text-md">
      <div className={`flex flex-col gap-3 mb-10 mt-5`}>
        {menuItems1.map((item) => (
          <Link
            // href={`/dashboard/${item.toLowerCase()}`}
            href={`/dashboard`}
            key={item}
            onClick={() => handleButtonClick(item)}
            className={`py-2 px-4 rounded-md transition duration-300 text-center ${
              selected === item
                ? "bg-[#6138d1] text-white" // Active button style
                : "bg-white text-black" // Inactive button style
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className={`flex flex-col gap-3 mb-10`}>
        {menuItems2.map((item) => (
          <Link
            // href={`/dashboard/${item.toLowerCase()}`}
            href={`/dashboard/safefi-disputes`}
            key={item}
            onClick={() => handleButtonClick(item)}
            className={`py-2 px-4 rounded-md transition duration-300 text-center ${
              selected === item
                ? "bg-[#6138d1] text-white" // Active button style
                : "bg-white text-black" // Inactive button style
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className={`flex flex-col gap-3`}>
        {menuItems3.map((item) => (
          <Link
            // href={`/dashboard/${item.toLowerCase()}`}
            href={`/dashboard`}
            key={item}
            onClick={() => handleButtonClick(item)}
            className={`py-2 px-4 rounded-md transition duration-300 text-center ${
              selected === item
                ? "bg-[#6138d1] text-white" // Active button style
                : "bg-white text-black" // Inactive button style
            }`}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuOptions;
