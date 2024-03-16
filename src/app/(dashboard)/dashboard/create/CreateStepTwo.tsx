import CTACard from "@/components/ui/card/CTACard";
import { PaymentType, PaymentMode } from "../../../../types/payment";

type Props = {
  mode: PaymentMode;
  handlePaymentSelection: (payment: PaymentType) => void;
};

const CreateStepTwo: React.FC<Props> = ({ mode, handlePaymentSelection }) => {
  return (
    <div className="mx-auto max-w-screen-lg grid grid-cols-1 gap-4 md:grid-cols-3 justify-center items-center mt-12">
      <CTACard
        title="Direct Irreversible Payment"
        description={"Quick, one-off payments for single items or services."}
        featureTitle="Good for:"
        features={["Irreversible Payments"]}
        ctaText="Create Payment"
        ctaCallback={() => handlePaymentSelection("direct")}
        ctaVariant={mode === "basic" ? "primary" : "secondary"}
      />

      <CTACard
        title="Recurring Irreversible Payment (Subscription)"
        description={
          "Automate your recurring payments for subscriptions and leases."
        }
        featureTitle="Good for:"
        features={[
          "Recurring Crypto Payments",
          "Subscription, Leases, & Rent Payments",
        ]}
        ctaText="Create Subscription"
        ctaCallback={() => handlePaymentSelection("subscription")}
        ctaVariant={mode === "basic" ? "primary" : "secondary"}
      />

      <CTACard
        title="SafeFi Reversible Payment"
        description={
          "Secure, reversible payments to build trust in e-commerce."
        }
        featureTitle="Good for:"
        features={[
          "E-Commerce Checkout",
          "To Build Trust With Clients",
          "Safe Payments",
        ]}
        ctaText="Create SafeFi Payment"
        ctaCallback={() => handlePaymentSelection("safefi")}
        ctaVariant={mode === "basic" ? "primary" : "secondary"}
      />
    </div>
  );
};

export default CreateStepTwo;
