import Checkmark from "../checkmark/Checkmark";

type Props = {
  title: string;
  description: string;
  featureTitle: string;
  features: string[];
  ctaText: string;
  ctaCallback: (cta: string) => void;
  ctaVariant: "primary" | "secondary";
};

const CTACard: React.FC<Props> = ({
  title,
  description,
  featureTitle,
  features,
  ctaText,
  ctaCallback,
  ctaVariant,
}) => {
  return (
    <div className="rounded-xl border text-black bg-white min-h-[32rem] grid grid-rows-[auto,auto,1fr,auto] p-6">
      <div>
        <h1 className="font-bold text-2xl mb-2">{title}</h1>
      </div>
      <div className="">
        <h1 className="text-sm">{description}</h1>
      </div>

      <div className="my-4">
        <div>
          <h1 className="font-bold text-xl my-4">{featureTitle}</h1>
        </div>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center my-2">
            <Checkmark variant={ctaVariant} width={12} height={8} />
            <p className="text-sm">{feature}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className={`w-full py-2 px-4 rounded ${
            ctaVariant === "primary"
              ? "bg-orbita-iris hover:bg-purple-700 text-white"
              : "bg-black hover:bg-gray-700 text-white"
          }`}
          onClick={() => ctaCallback(ctaText.toLowerCase())}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default CTACard;
