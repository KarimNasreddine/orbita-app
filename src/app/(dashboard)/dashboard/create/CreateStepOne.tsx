import CTACard from "@/components/ui/card/CTACard";
import { PaymentMode } from "../../../../types/payment";

type Props = {
  handleModeSelection: (mode: PaymentMode) => void;
};

const CreateStepOne: React.FC<Props> = ({ handleModeSelection }) => {
  return (
    <div className="mx-auto max-w-screen-lg grid grid-cols-1 gap-4 md:grid-cols-2 justify-center items-center mt-12">
      <CTACard
        title="Basic"
        description={
          "Basic Mode simplifies transactions with a straightforward approach, perfect for individuals, and charities. It's ideal for one-off fixed price purchases or recurring payments for single-tier fixed price services."
        }
        featureTitle="Better for:"
        features={[
          "Tailored for individual users and small-scale transactions",
          "Streamlined process for fixed-price items",
          "Made for one item checkout flow",
        ]}
        ctaText="Choose Basic Mode"
        ctaCallback={() => handleModeSelection("basic")}
        ctaVariant={"primary"}
      />

      <CTACard
        title="Business"
        description={
          "Business Mode offers advanced payment solutions for merchants. It supports a dynamic pricing model and caters to complex transactions involving multiple items supporting the option for discounts and sales."
        }
        featureTitle="Better for:"
        features={[
          "Customized for businesses with diverse inventories",
          "Flexible pricing to accommodate sales and discounts",
          "Supports complex transactions with multiple items",
          "Optimized for e-commerce scalability",
        ]}
        ctaText="Choose Business Mode"
        ctaCallback={() => handleModeSelection("business")}
        ctaVariant={"secondary"}
      />
    </div>
  );
};

export default CreateStepOne;
