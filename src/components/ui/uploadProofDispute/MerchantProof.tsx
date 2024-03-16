import { FC } from "react";

interface MerchantProofProps {}

const MerchantProof: FC<MerchantProofProps> = ({}) => {
  return (
    <div className="flex gap-12 shadow-[inset_0px_0px_10px_0px_#00000024] rounded-2xl p-8 items-center">
      <div className="w-[25%] flex flex-col gap-4">
        <h3 className="font-bold text-xl text-[#6038d1]">
          Merchant Response (5 Days)
        </h3>
        <p className="text-xs xl:text-sm">
          Please upload all the proof that you have available to be able to
          state your case. This proof will be sent to the SafeFi Dispute Judge
          for a final verdict.
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantProof;
