// components/ui/MenuOption.tsx
import React from "react";
import Link from "next/link";

interface MenuOptionProps {
  href: string;
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
}

const MenuOption: React.FC<MenuOptionProps> = ({
  href,
  onClick,
  isSelected,
  children,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-2 px-4 rounded-md transition duration-300 text-center ${
        isSelected ? "bg-[#6138d1] text-white" : "bg-transparent text-black"
      }`}
    >
      {children}
    </Link>
  );
};

export default MenuOption;
