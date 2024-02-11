import { FC, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      await axios.post("/api/message/send", {
        text: input,
        chatId: chatId,
      });
      setInput("");
      textAreaRef.current?.focus();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
          placeholder={`Message ${chatPartner.name}`}
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
        {/* <button className="bg-[#21252b] text-white rounded-2xl p-4">
          Send
        </button> */}
        <button
          disabled={isLoading}
          onClick={sendMessage}
          type="submit"
          className="bg-[#21252b] text-white rounded-2xl p-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
