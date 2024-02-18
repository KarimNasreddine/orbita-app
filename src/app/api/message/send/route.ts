import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message, messageValidator } from "@/lib/validations/message";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();

    // FOR TESTING PURPOSES UNTIL KEPLR IS INTEGRATED
    const clientId = "12345";
    const merchantId = "67890";

    const timestamp = Date.now();

    const messageData: Message = {
      id: nanoid(),
      senderId: clientId,
      text,
      timestamp,
    };

    const message = messageValidator.parse(messageData);

    pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      "incoming-message",
      message
    );

    const data = await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });

    console.log("data", data);

    return new Response("OK");
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
