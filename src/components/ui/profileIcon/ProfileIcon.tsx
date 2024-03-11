import SVG from "react-inlinesvg";
import avatar from "gradient-avatar";

export default function IgntProfileIcon({ className, address, width }: { className?: string; address: string; width: number }) {
  const getAvatar = () => {
    return avatar(address + "", width);
  };
  return (
    <div className={"rounded-lg" + className}>
      <SVG src={getAvatar()}></SVG>
    </div>
  );
}