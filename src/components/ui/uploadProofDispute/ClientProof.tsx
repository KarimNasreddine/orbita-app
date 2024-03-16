import { FC, useState } from "react";

interface ClientProofProps {}

const ClientProof: FC<ClientProofProps> = ({}) => {
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = async (event) => {
    setFile(event.target.files?.[0]);
    console.log("File: ", event.target.files?.[0]);
  };
  return (
    <div className="flex gap-12 border-4 border-[#fe14be] bg-[#fff4fc] rounded-2xl p-8 items-center">
      <div className="w-[25%] flex flex-col gap-4">
        <h3 className="font-bold text-xl text-[#fe14be]">
          Upload Your Proofs (5 days)
        </h3>
        <p className="text-xs xl:text-sm">
          Please upload all the proof that you have available to be able to
          state your case. This proof will be sent to the SafeFi Dispute Judge
          for a final verdict.
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
            <div className="flex justify-center items-center">
              <label className="bg-[#bd3695] p-4 rounded-lg mt-2 text-xs cursor-pointer relative overflow-hidden">
                Upload Proof
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
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
              Upload Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProof;
