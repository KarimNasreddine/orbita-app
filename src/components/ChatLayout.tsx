/* eslint-disable react/no-unescaped-entities */
import { FC } from "react";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface ChatLayoutProps {}

const ChatLayout: FC<ChatLayoutProps> = ({}) => {
  return (
    <div
      className={`flex relative p-4 flex-col text-sm w-full bg-[#f2f2f2] shadow-[inset_0px_0px_10px_0px_#00000024] rounded-2xl shadow-custom-one-side overflow-x-auto ${spaceGrotesk.className}`}
    >
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>
          Hi, I ordered a product from your store two weeks ago and it still
          hasn't arrived. Can you please check on this?
        </p>
      </div>
      <div className="mb-2 w-[50%] p-4 bg-[#6038d1] text-white rounded-xl">
        <p>
          <span className="font-bold">Merchant: </span>
          Hello, I checked our records and your order was shipped the next day.
          It should have arrived by now.
        </p>
      </div>
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>I understand, but I haven't
          received anything. Can I request a refund or a replacement?
        </p>
      </div>
      <div className="mb-2 w-[50%] p-4 bg-[#6038d1] text-white rounded-xl">
        <p>
          <span className="font-bold">Merchant: </span>
          I'm sorry, but our policy is clear that we are not responsible for
          items once they are shipped. We cannot offer a refund or replacement.
        </p>
      </div>
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>
          That seems unfair. I paid for the item but never received it. There
          must be something we can do here.
        </p>
      </div>
      <div className="mb-2 w-[50%] p-4 bg-[#6038d1] text-white rounded-xl">
        <p>
          <span className="font-bold">Merchant: </span>
          Our hands are tied once the item is with the shipping service. You
          might want to check with them.
        </p>
      </div>
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>I already did, and they
          said they delivered it. But I never got it. Can you please reconsider?
          This is a lot of money for me.
        </p>
      </div>
      <div className="mb-2 w-[50%] p-4 bg-[#6038d1] text-white rounded-xl">
        <p>
          <span className="font-bold">Merchant: </span>
          Unfortunately, our policy doesn't cover lost or stolen items after
          delivery. We can't issue a refund.
        </p>
      </div>
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>
          This is really disappointing. I thought online shopping was supposed
          to be secure and customer-friendly.
        </p>
      </div>
      <div className="mb-2 w-[50%] p-4 bg-[#6038d1] text-white rounded-xl">
        <p>
          <span className="font-bold">Merchant: </span>I understand your
          frustration, but we follow standard industry practices. There's
          nothing more we can do on our end.
        </p>
      </div>
      <div className="mb-2 w-[50%] self-end p-4 bg-white rounded-xl">
        <p>
          <span className="font-bold">Client: </span>
          I'll have to file a complaint then and continue the dispute. This
          isn't right. I paid for a product I never received.
        </p>
      </div>
      <div className="sticky bottom-0 w-full">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full rounded-2xl border-2 border-gray-300 p-4 shadow-[0px_0px_50px_20px_#00000024]"
          />
          <button className="bg-[#21252b] text-white rounded-2xl p-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
