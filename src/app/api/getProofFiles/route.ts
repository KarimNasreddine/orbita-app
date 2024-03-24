// NOT USED YET

// src/app/api/processFile/route.ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const walletAddress = cookieStore.get("walletAddress");

  const queryParams = req.nextUrl.searchParams;
  const fileName =
    "6--orbita10szqnwf0gsw2md35rdxv0k8pzmycvtf0v2rww9--orbita1ngptzl87txkepzu0j6sj7nq56zyzy8hf5tfqh9--client--proof-of-shipment.jpeg";

  if (!walletAddress) {
    return new Response(JSON.stringify({ error: "Wallet not connected" }), {
      status: 400,
    });
  }

  if (!fileName) {
    return new Response(JSON.stringify({ error: "File name is required" }), {
      status: 400,
    });
  }

  const getObjectCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
  });

  try {
    const { Body } = await s3.send(getObjectCommand);

    return new Response(JSON.stringify({ success: { fileContents: Body } }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting file from S3:", error);
    return new Response(JSON.stringify({ error: "Error getting file" }), {
      status: 500,
    });
  }
}
