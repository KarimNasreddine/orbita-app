import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const clientProofTypes = [
  "Proof Of Shipment",
  "Proof Of Delivery",
  "Transaction Records",
  "Communication Logs",
  "Product Information",
  "Policy Documentation",
  "Miscellaneous Evidence 1",
  "Miscellaneous Evidence 2",
];

const merchantProofTypes = [
  "Proof Of Shipment",
  "Proof Of Delivery",
  "Transaction Records",
  "Communication Logs",
  "Product Information",
  "Policy Documentation",
  "Miscellaneous Evidence 1",
  "Miscellaneous Evidence 2",
];

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const walletAddress = cookieStore.get("walletAddress");

  const queryParams = req.nextUrl.searchParams;
  const disputeId = queryParams.get("disputeId");
  const role = queryParams.get("role");

  if (!walletAddress) {
    return new Response(JSON.stringify({ error: "Wallet not connected" }), {
      status: 400,
    });
  }

  if (!role || !disputeId) {
    return new Response(
      JSON.stringify({
        error: "Role, client address, and merchant address are required",
      }),
      {
        status: 400,
      }
    );
  }

  const proofTypes = role === "client" ? clientProofTypes : merchantProofTypes;
  const proofStatus = {};

  const transactionId = disputeId.split("--")[0];
  const merchantAddress = disputeId.split("--")[1];
  const clientAddress = disputeId.split("--")[2];

  for (const proofType of proofTypes) {
    const fileName = `${transactionId}--${merchantAddress}--${clientAddress}--${role}--${proofType
      .toLowerCase()
      .replace(/\s/g, "-")}.jpeg`;

    const headObjectCommand = new HeadObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
    });

    try {
      await s3.send(headObjectCommand);
      proofStatus[proofType] = true;
    } catch (error) {
      if ((error as Error).name === "NotFound") {
        // console.log("File not found in S3:", fileName);
        proofStatus[proofType] = false;
      } else {
        console.error("Error checking file in S3:", error);
        return new Response(
          JSON.stringify({ error: "Error checking file availability" }),
          {
            status: 500,
          }
        );
      }
    }
  }

  // console.log("Proof status:", proofStatus);
  return new Response(JSON.stringify({ success: proofStatus }), {
    status: 200,
  });
}
