import { FC } from "react";
import { Montserrat } from "next/font/google";
import DisputeCardClient from "@/components/ui/DisputeCardClient";
import DisputeCardMerchant from "@/components/ui/DisputeCardMerchant";

const montserrat = Montserrat({ subsets: ["latin"] });

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="w-full h-full p-10 rounded-[2rem] flex flex-col gap-10 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h2 className={`${montserrat.className} font-bold text-2xl`}>
        Your Active Disputes
      </h2>
      <div className="flex gap-4">
        <DisputeCardClient />
        <DisputeCardClient />
        <DisputeCardMerchant />
      </div>
      <h2 className={`${montserrat.className} font-bold text-2xl`}>
        Resolved Disputes History
      </h2>
    </div>
  );
};

export default page;
