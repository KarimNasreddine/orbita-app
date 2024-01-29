import { Montserrat } from "next/font/google";
import { Dispatch, FC, SetStateAction } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

interface DisputeCardClientProps {
  setHideViewDispute: Dispatch<SetStateAction<boolean>>;
}

const DisputeCardClient: FC<DisputeCardClientProps> = ({
  setHideViewDispute,
}) => {
  const handleClick = () => {
    setHideViewDispute(false);
  };
  return (
    <div
      className={`${montserrat.className} min-w-64 max-w-72 flex flex-col bg-[#fe14bf] text-white items-center rounded-[1rem] pt-5 gap-2`}
    >
      <h3 className="text-2xl">GYMSHARK.COM</h3>
      <h4 className="font-bold text-lg">50 ATOM</h4>
      <button
        onClick={handleClick}
        className="font-semibold text-sm bg-[#0000002e] w-[80%] rounded-md py-2"
      >
        View Dispute
      </button>
      <button className="font-semibold text-sm bg-[#f2a904] w-[80%] rounded-md p-2">
        Cancel Dispute
      </button>
      <div className="w-full flex text-sm overflow-hidden rounded-b-[1rem] mt-2 font-bold">
        <div className="w-[50%] flex flex-col justify-center items-center p-3">
          <p>INITIATED</p>
          <p>2024 - 05 - 23</p>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center bg-[#0000002e] p-3">
          <p>VERDICT</p>
          <p>3 DAYS LEFT</p>
        </div>
      </div>
    </div>
  );
};

export default DisputeCardClient;
