/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import ChatInput from "./ChatInput";
import { Message, messageArrayValidator } from "@/lib/validations/message";
import { fetchRedis } from "@/helpers/redis";
import { cn, toPusherKey } from "@/lib/utils";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";
import { useAddressContext } from "@/def-hooks/addressContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface ChatLayoutProps {
  dispute: {
    creator: string | undefined;
    merchant: string | undefined;
    contractName: string | undefined;
    transactionID: string | undefined;
    amount: string | undefined;
    initiatedDate: string | undefined;
    daysLeft: string | undefined;
  };
}

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
    // notFound();
    console.log("error", error);
  }
}

const ChatLayout: FC<ChatLayoutProps> = ({ dispute }) => {
  const { address } = useAddressContext();
  const initialMessages: Message[] = [];
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const chatId = dispute.transactionID!;

  // const chatPartner: User = {
  //   name: "John Doe",
  //   publicAddress: "0x1234567890",
  //   image: "",
  //   id: "2",
  // };

  let chatPartner: User = {
    name: dispute.creator!,
    publicAddress: dispute.creator!,
  };

  if (address === dispute.creator) {
    chatPartner = {
      name: dispute.merchant!,
      publicAddress: dispute.merchant!,
    };
  }

  // if (address === dispute.creator) {
  //   const chatPartner = {
  //     name: dispute.merchant,
  //     publicAddress: dispute.merchant,
  //   };
  // }

  // Ref to scroll to bottom of chat
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  // Format timestamp to HH:mm
  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  // Fetch messages from Redis
  useEffect(() => {
    getChatMessages(chatId!).then((messages) => {
      setMessages(messages || []);
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
          const isCurrentUser = message.senderAddress === address;
          const isClient = message.senderAddress === dispute.creator;
          const hasNextMessageFromSameUser =
            messages[index - 1]?.senderAddress ===
            messages[index]?.senderAddress;

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
                    {isClient ? "Client: " : "Merchant: "}
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
