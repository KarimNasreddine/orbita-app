import { chatHrefConstructor, cn } from "@/lib/utils";
import { dateTransformer } from "@/utils/dateTransfromer";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { FC } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

interface DisputeCardProps {
  disputesOpened: {
    creator: string | undefined;
    merchant: string | undefined;
    contractName: string | undefined;
    transactionID: string | undefined;
    amount: string | undefined;
    initiatedDate: string | undefined;
    daysLeft: string | undefined;
  };
  account: "client" | "merchant";
}

const DisputeCard: FC<DisputeCardProps> = ({ disputesOpened, account }) => {
  const dateInitiated = dateTransformer(disputesOpened.initiatedDate!);
  return (
    <div
      className={cn(
        `${montserrat.className} min-w-64 max-w-72 flex flex-col  text-white items-center rounded-[1rem] pt-5 gap-2`,
        {
          "bg-[#fe14bf]": account === "client",
          "bg-[#6038d1]": account === "merchant",
        }
      )}
    >
      <h3 className="text-xl text-center px-8">
        {disputesOpened.contractName}
      </h3>
      <h4 className="font-bold text-lg">{disputesOpened.amount}</h4>
      <Link
        href={`/dashboard/safefi-disputes/view-dispute/${chatHrefConstructor(
          disputesOpened.transactionID!,
          disputesOpened.merchant!,
          disputesOpened.creator!
        )}`}
        className="font-semibold text-sm bg-[#0000002e] w-[80%] rounded-md py-2 text-center"
      >
        View Dispute
      </Link>
      <button
        className={cn("font-semibold text-sm w-[80%] rounded-md p-2", {
          "bg-[#f2a904]": account === "client",
          "bg-[#1bd082]": account === "merchant",
        })}
      >
        {account === "client" ? "Cancel Dispute" : "Refund to Client"}
      </button>
      <div className="w-full flex text-sm overflow-hidden rounded-b-[1rem] mt-2 font-bold">
        <div className="w-[50%] flex flex-col justify-center items-center p-3">
          <p>INITIATED</p>
          <p>{dateInitiated}</p>
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center bg-[#0000002e] p-3">
          <p>VERDICT</p>
          <p>
            {disputesOpened.daysLeft === "1"
              ? `${disputesOpened.daysLeft} day left`
              : `${disputesOpened.daysLeft} days left`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisputeCard;
