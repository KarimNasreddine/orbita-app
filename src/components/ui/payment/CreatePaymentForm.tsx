import AcceptedCurrencyInput from "./AcceptedCurrencyInput";
import PaymentNameInput from "./PaymentNameInput";
import PaymentAmountInput from "./PaymentAmountInput";
import PayoutAddressInput from "./PayoutAddressInput";
import { useCreatePaymentContext } from "@/def-hooks/CreatePaymentContext";


const CreatePaymentForm: React.FC = () => {
  const { paymentType, mode } = useCreatePaymentContext();

  const title = `${
    paymentType === "direct"
      ? "Direct Irreversible Payment"
      : paymentType === "subscription"
      ? "Recurring Irreversible Payment (Subscription)"
      : "SafeFi Reversible Payment"
  } ${mode === "business" ? "- Business" : ""}`;

  return (
    <div className="rounded-xl border text-black bg-white min-h-[40rem] grid grid-rows-[1fr,auto,auto,auto,auto] gap-4 p-6">
      <div>
        <h1 className="font-bold text-2xl mb-2">{title}</h1>
      </div>
      <PaymentNameInput />
      <PaymentAmountInput />
      <PayoutAddressInput />
      <AcceptedCurrencyInput />
    </div>
  );
};

export default CreatePaymentForm;
