import { fetchRedis } from "@/helpers/redis";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function deleteChatMessages(chatId: string) {
  try {
    await fetchRedis("del", `chat:${chatId}:messages`);
    console.log(`Chat for ${chatId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting chat for ${chatId}:`, error);
  }
}

async function deleteProofFiles(
  disputeId: string,
  merchantAddress: string,
  clientAddress: string
) {
  const proofTypes = [
    "Proof Of Shipment",
    "Proof Of Delivery",
    "Transaction Records",
    "Communication Logs",
    "Product Information",
    "Policy Documentation",
    "Miscellaneous Evidence 1",
    "Miscellaneous Evidence 2",
  ];

  // Use flatMap and map to prepare all DeleteObjectCommands
  const deleteCommands = proofTypes.flatMap((proofType) =>
    ["client", "merchant"].map((party) => {
      const Key = `${disputeId}--${merchantAddress}--${clientAddress}--${party}--${proofType
        .replace(/\s/g, "-")
        .toLowerCase()}.jpeg`;
      return new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key,
      });
    })
  );

  try {
    // Execute all delete commands
    for (const command of deleteCommands) {
      await s3.send(command);
    }
    console.log(
      `All proof files for dispute ${disputeId} deleted successfully.`
    );
  } catch (error) {
    console.error(
      `Error deleting proof files for dispute ${disputeId}:`,
      error
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Your existing logic for resolving disputes...

    const { disputeId, merchantAddress, clientAddress } = await req.json();

    if (!disputeId || !merchantAddress || !clientAddress) {
      return new Response(JSON.stringify({ error: "Params are missing." }), {
        status: 400,
      });
    }

    console.log("Dispute ID:", disputeId);
    console.log("Merchant Address:", merchantAddress);
    console.log("Client Address:", clientAddress);

    // Example dispute object, adjust according to your application logic
    const dispute = {
      disputeId: disputeId,
      merchantAddress: merchantAddress,
      clientAddress: clientAddress,
    };

    // Resolve the dispute here and get the decision...

    // After resolving the dispute, delete chat messages and proof files
    await deleteChatMessages(dispute.disputeId);
    await deleteProofFiles(
      dispute.disputeId,
      dispute.merchantAddress,
      dispute.clientAddress
    );

    // Respond with success
    return new Response(
      JSON.stringify({
        message: "Dispute resolved and data cleaned up successfully.",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error resolving dispute:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error.",
      }),
      {
        status: 500,
      }
    );
  }
}
