import { FC, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { useAddressContext } from "@/def-hooks/addressContext";
import { useRouter } from "next/navigation";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
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

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId, dispute }) => {
  const { address } = useAddressContext();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const router = useRouter();

  const handleRefresh = () => {
    router.push("/safefi-disputes");
  };

  let userRole: "Client" | "Merchant" | undefined;

  if (dispute.creator === address) {
    userRole = "Client";
  }

  if (dispute.merchant === address) {
    userRole = "Merchant";
  }

  // This function is used to send a message to the chat
  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);
    const value = userRole + ": " + input;

    try {
      await axios.post("/api/message/send", {
        text: value,
        chatId: chatId,
        senderAddress: address,
      });
      setInput("");
      textAreaRef.current?.focus();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // This function is used to call ChatGPT to resolve the dispute
  // We use a button only for testing perposes
  // In the final version, the dispute resolver will be called automatically
  // Just replace the onClick function with callDisputeResolver() to test this feature
  const callDisputeResolver = async () => {
    try {
      setInput("Loading...");
      const response = await axios.post("/api/ai/disputeResolver", {
        chatId,
      });
      console.log("response: ", response.data);

      // Split the response into lines
      const lines = response.data.split("\n");
      // Update each line based on the last digit
      const updatedLines = lines.map((line) => {
        if (line.endsWith(": 0")) {
          return line.replace(": 0", ": refund");
        } else if (line.endsWith(": 1")) {
          return line.replace(": 1", ": proceed");
        }
        return line;
      });
      // Join the updated lines back into a single string
      const updatedResponse = updatedLines.join("\n");

      // if (response.data === 0) {
      //   console.log("Money will be refunded to the client");
      //   setInput("Money will be refunded to the client");
      // } else if (response.data === 1) {
      //   console.log("Money will be proceeded to the merchant");
      //   setInput("Money will be proceeded to the merchant");
      // }

      setInput(updatedResponse);
      toast.success("Decision sent successfully");
      handleRefresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // const callDeleteRoute = async () => {
  //   try {
  //     await axios.post("/api/deleteProofFiles", {
  //       disputeId: dispute.transactionID,
  //       merchantAddress: dispute.merchant,
  //       clientAddress: dispute.creator,
  //     });
  //     toast.success("Proof files deleted successfully");
  //   } catch (error) {
  //     toast.error("Something went wrong. Please try again later.");
  //   }
  // };

  return (
    <div className="sticky bottom-0 w-full">
      <div className="flex gap-4">
        <TextareaAutosize
          rows={1}
          maxRows={2}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Write your message here...`}
          className="w-full resize-none rounded-2xl border-2 border-gray-300 p-4 shadow-[0px_0px_50px_20px_#00000024]"
        />
        <div
          onClick={() => textAreaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
        <button
          disabled={isLoading}
          onClick={sendMessage}
          type="submit"
          className="bg-[#21252b] text-white rounded-2xl p-4"
        >
          Send
        </button>
        <button
          disabled={isLoading}
          onClick={callDisputeResolver}
          type="submit"
          className="bg-[#21252b] text-white rounded-2xl p-4"
        >
          AI
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
