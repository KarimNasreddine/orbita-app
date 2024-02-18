import { FC } from "react";
import { Montserrat } from "next/font/google";
import { X } from "lucide-react";
import { Button } from "@/components/ui/custom-button";
import { Space_Grotesk } from "next/font/google";
import ChatLayout from "@/components/ChatLayout";
import { cn } from "@/lib/utils";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface ViewDisputeProps {}

const ViewDispute: FC<ViewDisputeProps> = ({}) => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <div className={`${montserrat.className} flex gap-8 h-[25rem]`}>
        <div className="w-[40%] h-full flex flex-col justify-between">
          <div>
            <Link href="/dashboard/safefi-disputes">
              <X
                size={54}
                strokeWidth={2}
                color="#b2b2b2"
                className="-ml-3 hover:transition-all hover:scale-105 hover:duration-150"
              />
            </Link>
            <h2 className="font-bold text-xl xl:text-2xl leading-tight xl:leading-loose mb-4">
              GYM SHARK DISPUTE <br /> TX ID - #1001
            </h2>
            <p className="text-xs xl:text-sm">
              The Chat will remain accessible after the 3 day grace period,
              until the dispute verdict is finalized.
            </p>
          </div>
          <div className={`${spaceGrotesk.className}`}>
            <Button className="mt-8 p-6 w-full rounded-2xl bg-white text-[#fa0d4d] font-bold text-sm lg:text-base border-2 border-gray-300 hover:bg-[#fa0d4d] hover:text-white hover:transition-all hover:scale-105 hover:duration-150 hover:border-[#fa0d4d]">
              Cancel Dispute
            </Button>
            <div className="text-center mt-4 p-2 w-full rounded-2xl bg-[#fff4fc] text-[#fe14be] font-bold text-sm lg:text-base border-2 border-gray-300">
              Client Uploading <br />
              Proof...
            </div>
          </div>
        </div>
        <ChatLayout />
      </div>
      <div className="flex gap-12 shadow-[inset_0px_0px_10px_0px_#00000024] rounded-2xl p-8 items-center opacity-65">
        <div className="w-[25%] flex flex-col gap-4">
          <h3 className="font-bold text-xl text-[#6038d1]">
            Phase 2 - Merchant Response (5 Days)
          </h3>
          <p className="text-xs xl:text-sm">
            Please wait for the Merchant to decide on wether or not they would
            like to continue the dispute, or to cancel the dispute and refund
            you directly before the AI verdict.
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 text-white gap-4 text-center">
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #1</h6>
              <h4 className="font-bold text-base">Proof Of Shipment</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #2</h6>
              <h4 className="font-bold text-base">Proof Of Delivery</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #3</h6>
              <h4 className="font-bold text-base">Transaction Records</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #4</h6>
              <h4 className="font-bold text-base">Communication Logs</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #5</h6>
              <h4 className="font-bold text-base">Product Information</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #6</h6>
              <h4 className="font-bold text-base">Policy Documentation</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #7</h6>
              <h4 className="font-bold text-base">Miscellaneous Evidence 1</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#6038d1] rounded-lg relative">
            <button className="m-4 p-2 bg-[#5230b6] text-[#aa92e6] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #8</h6>
              <h4 className="font-bold text-base">Miscellaneous Evidence 2</h4>
              <button className="bg-[#5a41a0] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-12 border-4 border-[#fe14be] bg-[#fff4fc] rounded-2xl p-8 items-center">
        <div className="w-[25%] flex flex-col gap-4">
          <h3 className="font-bold text-xl text-[#fe14be]">
            Phase 3 - Upload Your Proofs (5 days)
          </h3>
          <p className="text-xs xl:text-sm">
            The Merchant has chose to continue the dispute. Please upload all
            the proof that you have available to be able to state your case.
            This proof will be sent to the SafeFi Dispute Judge for a final
            verdict.
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 text-white gap-4 text-center">
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #1</h6>
              <h4 className="font-bold text-base">Proof Of Shipment</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #2</h6>
              <h4 className="font-bold text-base">Proof Of Delivery</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #3</h6>
              <h4 className="font-bold text-base">Transaction Records</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #4</h6>
              <h4 className="font-bold text-base">Communication Logs</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #5</h6>
              <h4 className="font-bold text-base">Product Information</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #6</h6>
              <h4 className="font-bold text-base">Policy Documentation</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #7</h6>
              <h4 className="font-bold text-base">Miscellaneous Evidence 1</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
          <div className="bg-[#fe14be] rounded-lg relative">
            <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
              ?
            </button>
            <div className="flex flex-col items-center justify-center gap-2 m-10">
              <h6 className="text-xs">Evidence #8</h6>
              <h4 className="font-bold text-base">Miscellaneous Evidence 2</h4>
              <button className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs">
                Proof Uploaded
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDispute;
