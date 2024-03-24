import { useAddressContext } from "@/def-hooks/addressContext";
import { useClient } from "@/hooks/useClient";
import { chatHrefConstructor, cn } from "@/lib/utils";
import { dateTransformer } from "@/utils/dateTransfromer";
import { Amount } from "@/utils/interfaces";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/navigation";

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
    disputeID: string | undefined;
  };
  account: "client" | "merchant";
}

const DisputeCard: FC<DisputeCardProps> = ({ disputesOpened, account }) => {
  const { address } = useAddressContext();
  const client = useClient();
  const sendMsgUpdateDispute = client.OrbitaPay.tx.sendMsgUpdateDispute;

  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  const handleClick = async () => {
    const fee: Amount[] = [
      {
        amount: "0",
        denom: "uatom",
      },
    ];

    const memo = "";

    try {
      if (account === "merchant") {
        // refund to client
        const payload: any = {
          creator: address, // the merchant address
          id: disputesOpened.disputeID,
          verdict: "client",
        };

        const send = () =>
          sendMsgUpdateDispute({
            value: payload,
            fee: { amount: fee as Readonly<Amount[]>, gas: "200000" },
            memo,
          });

        const txResult = await send();
        if (txResult.code !== 0) {
          throw new Error();
        }
        refreshPage();
      } else if (account === "client") {
        // cancel dispute
        const sendMsgCancelDispute = client.OrbitaPay.tx.sendMsgCancelDispute;

        const payload: any = {
          creator: address, // the client address
          id: Number(disputesOpened.disputeID),
        };

        const send = () =>
          sendMsgCancelDispute({
            value: payload,
            fee: { amount: fee as Readonly<Amount[]>, gas: "200000" },
            memo,
          });
        const txResult = await send();
        if (txResult.code !== 0) {
          throw new Error();
        }
        refreshPage();
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

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
        href={`/safefi-disputes/view-dispute/${chatHrefConstructor(
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
        onClick={handleClick}
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
