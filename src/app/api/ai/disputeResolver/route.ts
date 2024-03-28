// CHAT GPT replies with 0 if decision is to refund, and 1 if decision is to proceed

import { fetchRedis } from "@/helpers/redis";
import { useClient } from "@/hooks/useClient";
import { messageArrayValidator } from "@/lib/validations/message";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let chatGptPrompt = "";

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

// Fetches messages from Redis
async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reversedDbMessages);

    const reversedMessages = messages.reverse();

    reversedMessages.forEach((message) => {
      chatGptPrompt += `${message.text}\n`;
    });
    // console.log(chatGptPrompt);
  } catch (error) {
    console.error(error);
  }
}

async function checkImageUrl(imageUrl) {
  try {
    const response = await axios.get(imageUrl);
    return response.headers["content-type"].startsWith("image/");
  } catch (error) {
    return false;
  }
}

async function analyzeProofs(proofTypes, dispute, party) {
  let analysis = `${party}'s proofs analysis:\n`;

  const proofs: any = [];

  let flag = true;

  const providedProofTypes: string[] = [];

  for (const proofType of proofTypes) {
    const imageUrl = `https://orbita-disputes-proof-files-local.s3.eu-north-1.amazonaws.com/${
      dispute.disputeId
    }--${dispute.merchantAddress}--${
      dispute.clientAddress
    }--${party}--${proofType.replace(/\s/g, "-").toLowerCase()}.jpeg`;
    // console.log("imageUrl: ", imageUrl);
    if (await checkImageUrl(imageUrl)) {
      if (flag) {
        proofs.push({
          type: "text",
          text: `Describe the images only if they indicate whether each is a proper proof document provided by a ${party} in an opened dispute. If not, only mention that they are irrelevant. Start the statement with the image number even if only one image is provided (ex: Image 1: ...).`,
        });
        flag = false;
      }
      proofs.push({
        type: "image_url",
        image_url: {
          url: imageUrl,
        },
      });
      // analysis += `${proofType}: ${imageUrl}\n`;
      providedProofTypes.push(proofType);
    } else {
      analysis += `No ${proofType} provided by the ${party}.\n`;
    }
  }
  // console.log("analysis: ", analysis);

  // console.log("providedProofTypes: ", providedProofTypes);

  if (proofs.length > 0) {
    // console.log("proofs: ", proofs);
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are a professional dispute case detector for a payment processing service. Your role is to analyze the proofs provided by the ${party} to determine the outcome of a payment dispute. Based on the information provided, describe each proof and its relevance to the dispute. Never include any additional information or commentary in your response.`,
        },

        {
          role: "user",
          content: proofs,
        },
      ],
    });

    let imageDescriptions = response.choices[0].message.content;

    if (imageDescriptions) {
      providedProofTypes.forEach((proofType, index) => {
        imageDescriptions = imageDescriptions!.replace(
          `Image ${index + 1}`,
          proofType
        );
      });

      analysis += `ChatGPT's analysis:\n${imageDescriptions}\n`;
    }
  }

  return analysis;
}

const handleDeleteDispute = async (transactionID, merchant, creator) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/deleteProofFilesAndChat",
      {
        disputeId: transactionID,
        merchantAddress: merchant,
        clientAddress: creator,
      }
    );
    // console.log("response: ", response.data);
    return `Proof files for Dispute #${transactionID} were deleted successfully.`;
  } catch (error) {
    console.error(
      `Error deleting proof files for Dispute #${transactionID}:`,
      error
    );
    return `Something went wrong. Proof files for Dispute #${transactionID} were not deleted.`;
  }
};

// This function is used to call ChatGPT to resolve the dispute
export async function POST(req: Request) {
  const client = useClient();
  const sendMsgUpdateDisputeAutoSign =
    client.OrbitaPay.tx.sendMsgUpdateDisputeAutoSign;
  const safefiAddress = process.env.safefiAddress;

  const response = await axios.get(
    "http://localhost:3000/api/getExpiredDisputes"
  );
  const expiredDisputes = response.data;

  let responseMessage = "";

  for (const dispute of expiredDisputes) {
    const clientProofsAnalysis = await analyzeProofs(
      clientProofTypes,
      dispute,
      "client"
    );
    const merchantProofsAnalysis = await analyzeProofs(
      merchantProofTypes,
      dispute,
      "merchant"
    );

    chatGptPrompt = ""; // Reset the prompt for each dispute
    await getChatMessages(dispute.disputeId); // Fetch messages for the current dispute

    const finalPrompt =
      clientProofsAnalysis +
      "\n" +
      merchantProofsAnalysis +
      "\n" +
      "Chat Between Client and Merchant:\n" +
      chatGptPrompt;

    console.log("finalPrompt: \n", finalPrompt);

    if (finalPrompt.trim() === "") {
      console.log(`No data found for dispute ${dispute.disputeId}`);
      continue;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a professional dispute case detector for a payment processing service. Your role is to analyze the proofs provided by the client and the merchant, as well as the conversation between them, to determine the outcome of a payment dispute. Based on the information provided, you must decide whether to issue a refund to the client or to proceed with the payment to the merchant. Your response should be concise and limited to a single digit: reply with '0' if your decision is to refund the client, and '1' if your decision is to proceed with the payment to the merchant. Do not include any additional information or commentary in your response.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
    });

    const decision = completion.choices[0].message.content;

    console.log(`Decision for dispute ${dispute.disputeId}: `, decision);

    console.log("\n");
    console.log("______________________________________________");
    console.log("\n");

    responseMessage += `Decision for dispute ${dispute.disputeId}: ${decision}\n`;

    const fee = [{ amount: "0", denom: "uatom" }];
    const memo = "";
    const payload = {
      creator: safefiAddress!,
      id: dispute.disputeId,
      verdict: decision === "0" ? "client" : "merchant",
    };

    // Uncomment the following line to send the decision to the blockchain

    await sendMsgUpdateDisputeAutoSign({
      value: payload,
      fee: { amount: fee, gas: "200000" },
      memo,
    });

    // Uncomment the following block to delete proof files and chat messages after resolving the dispute

    try {
      responseMessage += await handleDeleteDispute(
        dispute.disputeId,
        dispute.merchantAddress,
        dispute.clientAddress
      );
    } catch (error) {
      responseMessage += `Something went wrong. Files and chat messages for Dispute #${dispute.disputeId} were not deleted.`;
    }
  }

  return new Response(responseMessage, { status: 200 });
}
