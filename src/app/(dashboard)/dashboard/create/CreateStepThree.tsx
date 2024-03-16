import CreatePaymentCard from "@/components/ui/payment/CreatePaymentCard";
import CreatePaymentProvider from "@/def-hooks/CreatePaymentContext";
import PaymentPreview from "@/components/ui/payment/PaymentPreview";
import { PaymentMode, PaymentType } from "@/types/payment";

type Props = {
  mode: PaymentMode;
  paymentType: PaymentType;
};

const CreateStepThree: React.FC<Props> = ({ mode, paymentType }) => {
  return (
    <CreatePaymentProvider mode={mode} paymentType={paymentType}>
      <div className="mx-auto max-w-screen-lg flex flex-col-reverse md:grid md:grid-cols-[2fr,1fr] gap-4 justify-center items-center mt-12">
        <CreatePaymentCard />
        <PaymentPreview />
      </div>
    </CreatePaymentProvider>
  );
};

export default CreateStepThree;
