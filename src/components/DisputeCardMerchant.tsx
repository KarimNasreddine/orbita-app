import { Montserrat } from "next/font/google";
import { Dispatch, FC, SetStateAction } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

interface DisputeCardMerchantProps {
  setHideViewDispute: Dispatch<SetStateAction<boolean>>;
}

const DisputeCardMerchant: FC<DisputeCardMerchantProps> = ({
  setHideViewDispute,
}) => {
  const handleClick = () => {
    setHideViewDispute(false);
  };
  return (
    <div
      className={`${montserrat.className} min-w-64 max-w-72 flex flex-col bg-[#6138d1] text-white justify-center items-center rounded-[1rem] gap-2 py-5`}
    >
      <h3 className="text-2xl">GYMSHARK.COM</h3>
      <h4 className="font-bold text-lg mb-2">50 ATOM</h4>
      <button
        onClick={handleClick}
        className="font-semibold text-sm bg-[#0000002e] w-[80%] rounded-md py-2"
      >
        View Dispute
      </button>
      <button className="font-semibold text-sm bg-[#1bd082] w-[80%] rounded-md p-2">
        Cancel Dispute & Refund Client
      </button>
    </div>
  );
};

export default DisputeCardMerchant;
