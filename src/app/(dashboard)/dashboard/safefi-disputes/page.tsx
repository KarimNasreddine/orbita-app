/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC, useState } from "react";
import { Montserrat } from "next/font/google";
import DisputeCardClient from "@/components/DisputeCardClient";
import DisputeCardMerchant from "@/components/DisputeCardMerchant";


import { Space_Grotesk } from "next/font/google";

import ViewDispute from "@/components/ViewDispute";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/DataTable";
import { columns } from "./(disputesTable)/columns";
import { data } from "./(disputesTable)/data";

const montserrat = Montserrat({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const [hideViewDispute, setHideViewDispute] = useState(true);

  return (
    <div className="w-full p-10 rounded-[2rem] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      {/* <div className="w-full h-full p-10 rounded-[2rem] flex flex-col gap-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"> */}
      <div className={cn("flex flex-col gap-10", !hideViewDispute && "hidden")}>
        <h2 className={`${montserrat.className} font-bold text-2xl`}>
          Your Active Disputes
        </h2>
        <div className="flex gap-4">
          <DisputeCardClient setHideViewDispute={setHideViewDispute} />
          <DisputeCardClient setHideViewDispute={setHideViewDispute} />
          <DisputeCardMerchant setHideViewDispute={setHideViewDispute} />
        </div>
        <h2 className={`${montserrat.className} font-bold text-2xl`}>
          Resolved Disputes History
        </h2>
        <DataTable columns={columns} data={data} />
        {/* <DisputesTable /> */}
      </div>
      <ViewDispute
        hideViewDispute={hideViewDispute}
        setHideViewDispute={setHideViewDispute}
      />
    </div>
  );
};

export default Page;
