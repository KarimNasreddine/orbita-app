import { FC } from "react";

interface MenuOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MenuOption: FC<MenuOptionProps> = (props) => {
  const { ...rest } = props;
  return (
    <button
      className="text-white py-2 rounded-lg w-full max-w-[80%] bg-indigo-500"
      {...rest}
    >
      MENU ITEM
    </button>
  );
};

export default MenuOption;
