import { cn } from "@/lib/utils";
import { useState, useEffect, FC } from "react";

interface ClientProofProps {
  disputeId: string;
}

const ClientProof: FC<ClientProofProps> = ({ disputeId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [proofsUploaded, setProofsUploaded] = useState<boolean[]>([]);
  const [loadingOrErrors, setLoadingOrErrors] = useState<string[]>([]);

  const proofTypes = [
    "proofOfShipment",
    "proofOfDelivery",
    "transactionRecords",
    "communicationLogs",
    "productInformation",
    "policyDocumentation",
    "miscellaneousEvidence1",
    "miscellaneousEvidence2",
  ];

  useEffect(() => {
    setFiles(Array(proofTypes.length).fill(undefined));
    setFileUrls(Array(proofTypes.length).fill(undefined));
    setProofsUploaded(Array(proofTypes.length).fill(false));
    setLoadingOrErrors(Array(proofTypes.length).fill(""));
    checkUploadStatus();
  }, [disputeId]);

  const checkUploadStatus = async () => {
    try {
      const response = await fetch(
        `/api/getProofFilesStatus?disputeId=${encodeURIComponent(
          disputeId
        )}&role=${encodeURIComponent("client")}`
      );
      if (response.ok) {
        const data = await response.json();
        const updatedProofsUploaded = proofTypes.map((type) => {
          const formattedType = type
            .replace(/([A-Z])/g, " $1")
            .replace(/(\d+)/g, " $1")
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return !!data.success[formattedType];
        });
        setProofsUploaded(updatedProofsUploaded);
      } else {
        console.error("Failed to fetch upload status:", await response.text());
      }
    } catch (error) {
      console.error("Error checking upload status:", error);
    }
  };

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleFileChange = async (event, index) => {
    const file = event.target.files?.[0];

    if (fileUrls[index]) URL.revokeObjectURL(fileUrls[index]);

    if (file) {
      const newFiles = [...files];
      newFiles[index] = file;
      setFiles(newFiles);

      const url = URL.createObjectURL(file);
      const newFileUrls = [...fileUrls];
      newFileUrls[index] = url;
      setFileUrls(newFileUrls);

      await uploadFile(file, index);

      event.target.value = null;
    } else {
      const newFileUrls = [...fileUrls];
      newFileUrls[index] = "";
      setFileUrls(newFileUrls);
    }
  };

  const uploadFile = async (file, index) => {
    const checksum = await computeSHA256(file);
    const proofType = proofTypes[index];
    const formattedProofType = proofType
      .replace(/([A-Z0-9])/g, "-$1") // Insert a hyphen before each uppercase letter and number
      .toLowerCase(); // Convert the entire string to lowercase

    try {
      const response = await fetch(
        `/api/getSignedUrl?fileName=${encodeURIComponent(
          disputeId
        )}&fileType=${encodeURIComponent(
          file.type
        )}&fileSize=${encodeURIComponent(
          file.size
        )}&ChecksumSHA256=${encodeURIComponent(
          checksum
        )}&user=${encodeURIComponent("client")}&imageRole=${encodeURIComponent(
          formattedProofType
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const signedUrlResult = await response.json();

      if (signedUrlResult.failure !== undefined) {
        throw new Error(signedUrlResult.failure);
      }

      const newLoadingOrErrors = [...loadingOrErrors];
      newLoadingOrErrors[index] = "Loading";
      setLoadingOrErrors(newLoadingOrErrors);

      const url = signedUrlResult.success.url;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const newProofsUploaded = [...proofsUploaded];
      newProofsUploaded[index] = true;
      setProofsUploaded(newProofsUploaded);
    } catch (error) {
      const newProofsUploaded = [...proofsUploaded];
      newProofsUploaded[index] = false;
      setProofsUploaded(newProofsUploaded);

      const newLoadingOrErrors = [...loadingOrErrors];
      newLoadingOrErrors[index] = "Error";
      setLoadingOrErrors(newLoadingOrErrors);

      console.error("Error uploading file:", error);
    } finally {
      const newLoadingOrErrors = [...loadingOrErrors];
      newLoadingOrErrors[index] = "";
      setLoadingOrErrors(newLoadingOrErrors);
    }
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
        {proofTypes.map((proofType, index) => {
          const formattedProofType = proofType
            .replace(/([A-Z])/g, " $1")
            .replace(/(\d+)/g, " $1")
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <div key={index} className="bg-[#fe14be] rounded-lg relative">
              <button className="m-4 p-2 bg-[#dd12a7] text-[#fe8bda] absolute top-0 right-0 rounded-full text-xs">
                ?
              </button>
              <div className="flex flex-col items-center justify-between gap-2 px-10 py-5 h-full">
                <h6 className="text-xs">Evidence #{index + 1}</h6>
                <h4 className="font-bold text-base">{formattedProofType}</h4>
                <div className="flex justify-center items-center">
                  <label
                    className={cn(
                      "bg-[#bd3695] opacity-100 p-4 rounded-lg mt-2 text-xs cursor-pointer relative overflow-hidden",
                      proofsUploaded[index] && "opacity-50"
                    )}
                  >
                    {proofsUploaded[index] ? "Proof Uploaded" : "Upload Proof"}
                    {loadingOrErrors[index] === "Loading" && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#fe8bda]"></div>
                      </div>
                    )}
                    {loadingOrErrors[index] === "Error" && (
                      <div className="absolute inset-0 bg-red-600 bg-opacity-100 flex items-center justify-center">
                        <h1>Error</h1>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpg"
                      onChange={(event) => handleFileChange(event, index)}
                      className="hidden"
                    />
                    {fileUrls[index] && (
                      <p className="text-[0.5rem] text-white rounded-md bg-black bg-opacity-50 m-1">
                        {files[index]?.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientProof;
