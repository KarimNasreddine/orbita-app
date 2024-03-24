// src/app/api/getSignedUrl/route.ts
import { cookies } from "next/headers";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const acceptedTypes = ["image/jpeg"];

const maxFileSize = 1024 * 1024 * 5; // 5MB

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const walletAddress = cookieStore.get("walletAddress");

  const queryParams = req.nextUrl.searchParams;

  const fileName = queryParams.get("fileName");
  const fileType = queryParams.get("fileType");
  const fileSize = queryParams.get("fileSize");
  const ChecksumSHA256 = queryParams.get("ChecksumSHA256");
  const user = queryParams.get("user");
  const imageRole = queryParams.get("imageRole");

  console.log("fileName: ", fileName);
  console.log("fileType: ", fileType);
  console.log("fileSize: ", fileSize);
  console.log("ChecksumSHA256: ", ChecksumSHA256);
  console.log("user: ", user);
  console.log("imageRole: ", imageRole);

  if (!walletAddress) {
    return new Response(JSON.stringify({ error: "Wallet not connected" }), {
      status: 400,
    });
  }

  if (!acceptedTypes.includes(fileType!)) {
    return new Response(JSON.stringify({ error: "Invalid file type" }), {
      status: 400,
    });
  }

  if (Number(fileSize) > maxFileSize)
    return new Response(JSON.stringify({ error: "File too large" }), {
      status: 400,
    });

  // const shortType = fileType?.replace("image/", "");

  let imageName = fileName! + "--" + user! + "--" + imageRole! + "." + "jpeg";

  imageName = imageName.replace(/\s+/g, "");

  console.log("imageName: ", imageName);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: imageName,
    ContentType: fileType!,
    ContentLength: Number(fileSize),
    ChecksumSHA256: ChecksumSHA256!,
    Metadata: {
      walletAddress: walletAddress.toString(),
    },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return new Response(JSON.stringify({ success: { url: signedURL } }), {
    status: 200,
  });
}
