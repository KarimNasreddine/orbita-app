/* eslint-disable react/no-unescaped-entities */
"use client";
import { FC, useEffect } from "react";
import { Montserrat } from "next/font/google";
import DisputeCard from "@/components/ui/card/DisputeCard";
import { DataTable } from "@/components/ui/table/DataTable";
import { Dispute, columns } from "./(disputesTable)/columns";
import { useAddressContext } from "@/def-hooks/addressContext";
import { useClientDisputesInfo } from "@/def-hooks/useClientDisputesInfo";
import { dateTransformer } from "@/utils/dateTransfromer";
import { db } from "@/lib/db";

const montserrat = Montserrat({ subsets: ["latin"] });

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { address } = useAddressContext();
  const { disputesOpened, disputesResolved } = useClientDisputesInfo();
  // const { disputesOpened, disputesResolved } = useMerchantDisputesInfo();

  const disputesResolvedData: Dispute[] = disputesResolved.map((dispute) => {
    let verdict: "In your favour" | "Not in your favour";

    if (dispute.Verdict === "client" && dispute.creator === address) {
      verdict = "In your favour";
    } else {
      verdict = "Not in your favour";
    }

    const formattedDate = dateTransformer(dispute.resolvedDate!);

    return {
      contractName: dispute.contractName ?? "",
      transactionID: parseInt(dispute.transactionID ?? "") ?? 0,
      amount: dispute.amount ?? "",
      resolvedDate: formattedDate ?? "",
      Verdict: verdict,
      Details: "View details",
    };
  });

  const data: Dispute[] = disputesResolvedData;

  return (
    <div className="xl:max-w-[80vw] p-10 rounded-[2rem] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      {/* <div className="w-full h-full p-10 rounded-[2rem] flex flex-col gap-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"> */}
      <div className={"flex flex-col gap-10"}>
        <h2 className={`${montserrat.className} font-bold text-2xl`}>
          Your Active Disputes
        </h2>
        <div className="flex overflow-x-auto gap-4">
          {disputesOpened.map((dispute) => {
            if (dispute.creator === address) {
              return (
                <DisputeCard
                  key={dispute.disputeID}
                  disputesOpened={dispute}
                  account="client"
                />
              );
            }
            return (
              <DisputeCard
                key={dispute.disputeID}
                disputesOpened={dispute}
                account="merchant"
              />
            );
          })}
        </div>
        <h2 className={`${montserrat.className} font-bold text-2xl`}>
          Resolved Disputes History
        </h2>
        <DataTable columns={columns} data={data} />
        {/* <DisputesTable /> */}
      </div>
    </div>
  );
};

export default Page;
