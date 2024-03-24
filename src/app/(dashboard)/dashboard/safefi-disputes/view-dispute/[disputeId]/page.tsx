"use client";

import { FC, useEffect } from "react";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { Space_Grotesk } from "next/font/google";
import ChatLayout from "@/components/ui/chat/ChatLayout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAddressContext } from "@/def-hooks/addressContext";
import { useClientDisputesInfo } from "@/def-hooks/useClientDisputesInfo";
import { notFound } from "next/navigation";
import { useClient } from "@/hooks/useClient";
import { Amount } from "@/utils/interfaces";
import MerchantProof from "@/components/ui/uploadProofDispute/MerchantProof";
import ClientProof from "@/components/ui/uploadProofDispute/ClientProof";
import { db } from "@/lib/db";

const montserrat = Montserrat({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface PageProps {
  params: {
    disputeId: string;
  };
}

const ViewDispute: FC<PageProps> = ({ params }: PageProps) => {
  const { disputeId } = params;
  const { address } = useAddressContext();
  const { disputesOpened } = useClientDisputesInfo();
  const igniteClient = useClient();

  // console.log("disputeId:", disputeId);

  const [transactionID, merchant, client] = disputeId.split("--");

  const dispute = disputesOpened.find(
    (dispute) =>
      dispute.transactionID === transactionID &&
      dispute.merchant === merchant &&
      dispute.creator === client
  );

  // This useEffect is used to send the dispute details to Upstash Redis for AI to process
  useEffect(() => {
    if (!dispute) {
      return;
    }
    const today = new Date();
    const daysLeft = Number(dispute.daysLeft);
    console.log("daysLeft:", daysLeft);
    const expiryDate = new Date(today.setDate(today.getDate() + daysLeft))
      .toISOString()
      .split("T")[0];

    const sendDisputeToUpstashRedis = async () => {
      await db.hset(`dispute:${transactionID}`, {
        merchantAddress: merchant,
        clientAddress: client,
        expiryDate: expiryDate,
      });
    };

    sendDisputeToUpstashRedis();
  });

  if (merchant !== address && client !== address) {
    return notFound();
  }

  const account = merchant === address ? "merchant" : "client";

  const handleClick = async () => {
    const fee = [
      {
        amount: "0",
        denom: "uatom",
      },
    ];

    const memo = "";

    const sendMsgUpdateDispute = igniteClient.OrbitaPay.tx.sendMsgUpdateDispute;
    const sendMsgCancelDispute = igniteClient.OrbitaPay.tx.sendMsgCancelDispute;

    try {
      if (account === "merchant") {
        // refund to client
        const payload: any = {
          creator: address, // the merchant address
          id: dispute?.disputeID,
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
      } else if (account === "client") {
        const payload: any = {
          creator: address, // the client address
          id: Number(dispute?.disputeID),
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
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-12")}>
      <div className={`${montserrat.className} flex gap-8 h-[25rem]`}>
        <div className="w-[40%] h-full flex flex-col justify-between">
          <div>
            <div className="flex">
              <Link
                href="/dashboard/safefi-disputes"
                className="-ml-3 hover:transition-all hover:scale-105 hover:duration-150"
              >
                <X size={54} strokeWidth={2} color="#b2b2b2" />
              </Link>
            </div>
            <h2 className="font-bold text-xl xl:text-[1.4rem] leading-tight xl:leading-loose mb-4">
              {dispute?.contractName} <br /> TX ID - #{dispute?.transactionID}
            </h2>
            <p className="text-xs xl:text-sm">
              The Chat will remain accessible after the 3 day grace period,
              until the dispute verdict is finalized.
            </p>
          </div>
          <div className={`${spaceGrotesk.className}`}>
            <Button
              onClick={handleClick}
              className="mt-8 p-6 w-full rounded-2xl bg-white text-[#fa0d4d] font-bold text-sm lg:text-base border-2 border-gray-300 hover:bg-[#fa0d4d] hover:text-white hover:transition-all hover:scale-105 hover:duration-150 hover:border-[#fa0d4d]"
            >
              {account === "client" ? "Cancel Dispute" : "Refund to Client"}
            </Button>
            <div
              className={cn(
                "text-center mt-4 p-2 w-full rounded-2xl bg-white font-bold text-sm lg:text-base border-2 border-gray-300",
                {
                  " text-[#6038d1]": account === "merchant",
                },
                { " text-[#fe14be]": account === "client" }
              )}
            >
              {account === "client" ? "Merchant" : "Client"} Uploading <br />
              Proof...
            </div>
          </div>
        </div>
        {dispute?.transactionID && <ChatLayout dispute={dispute} />}
      </div>
      {account === "merchant" ? (
        <MerchantProof disputeId={disputeId} />
      ) : (
        <ClientProof disputeId={disputeId} />
      )}
    </div>
  );
};

export default ViewDispute;
