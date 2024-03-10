// CHAT GPT replies with 0 if decision is to refund, and 1 if decision is to proceed

import { env } from "@/env";
import { fetchRedis } from "@/helpers/redis";
import { messageArrayValidator } from "@/lib/validations/message";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

let chatGptPrompt = "";

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
      if (message.senderAddress === "12345") {
        chatGptPrompt += `Client: ${message.text}\n`;
      } else {
        chatGptPrompt += `Merchant: ${message.text}\n`;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

// This function is used to call ChatGPT to resolve the dispute
export async function POST(req: Request) {
  const { chatId } = await req.json();
  await getChatMessages(chatId);
  if (chatGptPrompt === "") {
    return new Response("No messages found", { status: 404 });
  } else {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional dispute case detector for a payment processing service. Your role is to analyze the conversation between the client and the merchant to determine the outcome of a payment dispute. Based on the information provided in the conversation, you must decide whether to issue a refund to the client or to proceed with the payment to the merchant. Your response should be concise and limited to a single digit: reply with '0' if your decision is to refund the client, and '1' if your decision is to proceed with the payment to the merchant. Do not include any additional information or commentary in your response.",
        },
        {
          role: "user",
          content: chatGptPrompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log("Decision: ", completion.choices[0].message.content);
    return new Response(completion.choices[0].message.content);
  }
}
