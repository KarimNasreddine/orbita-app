/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import ChatInput from "./ChatInput";
import { notFound } from "next/navigation";
import { Message, messageArrayValidator } from "@/lib/validations/message";
import { fetchRedis } from "@/helpers/redis";
import { cn, toPusherKey } from "@/lib/utils";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface ChatLayoutProps {}

// FOR TESTING PURPOSES UNTIL KEPLR IS INTEGRATED
// CURRENT USER ID: 12345
// MERCHANT ID: 67890

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

    return messages.reverse();
  } catch (error) {
    notFound();
  }
}

const ChatLayout: FC<ChatLayoutProps> = ({}) => {
  const initialMessages: Message[] = [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const chatId = "1";

  const chatPartner: User = {
    name: "John Doe",
    publicAddress: "0x1234567890",
    image: "",
    id: "2",
  };

  // Ref to scroll to bottom of chat
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  // Format timestamp to HH:mm
  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  // Fetch messages from Redis
  useEffect(() => {
    getChatMessages(chatId).then((messages) => {
      setMessages(messages);
    });
  }, []);

  // Handler for incoming messages
  const messageHandler = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // Subscribe to the chat channel
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`)!);

    pusherClient.bind("incoming-message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`)!);
      pusherClient.unbind("incoming-message", messageHandler);
    };
  }, [chatId]);

  return (
    <div
      className={`flex justify-between overflow-x-auto relative p-4 flex-col text-sm w-full bg-[#f2f2f2] shadow-[inset_0px_0px_10px_0px_#00000024] rounded-2xl shadow-custom-one-side ${spaceGrotesk.className}`}
    >
      <div className="flex flex-col">
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === "12345";
          const hasNextMessageFromSameUser =
            messages[index - 1]?.senderId === messages[index]?.senderId;

          return (
            <div
              className="flex flex-col"
              key={`${message.id}-${message.timestamp}`}
            >
              <div
                className={cn(
                  "flex justify-between mb-2 p-4 rounded-xl lg:max-w-[50%] w-fit",
                  {
                    "self-end bg-white text-black": isCurrentUser,
                    "bg-[#6038d1] text-white": !isCurrentUser,
                  }
                )}
              >
                <p>
                  <span className="font-bold">
                    {isCurrentUser ? "Client: " : "Merchant: "}
                  </span>
                  {message.text}
                </p>
                {/* If timestamp is needed, uncomment the following line */}
                {/* <span
                  className={cn("ml-2 text-xs text-gray-400 self-center pl-1", {
                    "text-gray-700": isCurrentUser,
                    "text-gray-300": !isCurrentUser,
                  })}
                >
                  {formatTimestamp(message.timestamp)}
                </span> */}
              </div>
            </div>
          );
        })}
        <div ref={scrollDownRef} />
      </div>
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default ChatLayout;
