import SVG from "react-inlinesvg";
import { MD5 } from "crypto-js";
import avatar from "gradient-avatar";

export default function IgntProfileIcon({ className, address, width }: { className?: string; address: string; width: number }) {
  const getAvatar = () => {
    return avatar(MD5(address) + "", width);
  };
  return (
    <div className={"avatar rounded-lg" + className}>
      <SVG src={getAvatar()}></SVG>
    </div>
  );
}