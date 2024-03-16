import CurrencySelection from "../currency/CurrencySelection";
import DirectPaymentForm from "./DirectPaymentForm";
import SubscriptionPaymentForm from "./SubscriptionPaymentForm";
import SafeFiPaymentForm from "./SafeFiPaymentForm";
import { useCreatePaymentContext } from "../../../def-hooks/CreatePaymentContext";

const CreatePaymentCard: React.FC = () => {
  const { paymentType } = useCreatePaymentContext();

  return (
    <div className="rounded-xl border text-black bg-white min-h-[40rem] grid grid-rows-[1fr,auto,auto,auto,auto] gap-4 p-6">
      {paymentType === "direct" && <DirectPaymentForm />}
      {paymentType === "subscription" && <SubscriptionPaymentForm />}
      {paymentType === "safefi" && <SafeFiPaymentForm />}
      <div>
        <label className="block mb-2 font-semibold">Accepted Payments</label>
        <CurrencySelection readonly={false} singleSelect={false} />
      </div>
    </div>
  );
};

export default CreatePaymentCard;
