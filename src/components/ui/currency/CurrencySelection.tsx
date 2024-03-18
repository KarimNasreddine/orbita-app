import { Currency } from "@/types/currency";
import CurrencyLogo from "./CurrencyLogo";
import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/createPaymentContext";

type CurrencySelectionProps = {
  className?: string;
  readonly: boolean;
  singleSelect: boolean;
};

const CurrencySelection: React.FC<CurrencySelectionProps> = ({
  className,
  readonly,
  singleSelect,
}) => {
  const { acceptedCurrencies } = useCreatePaymentContext();
  const { setAcceptedCurrencies } = useCreatePaymentDispatchContext();

  const toggleSelection = (currency: Currency) => {
    let newSelection: { currency: Currency; selected: boolean }[] = [];
    if (singleSelect) {
      newSelection = acceptedCurrencies.map((c) => {
        if (c.currency === currency) {
          return { currency, selected: true };
        } else {
          return { currency: c.currency, selected: false };
        }
      });
      setAcceptedCurrencies(newSelection);
    } else {
      newSelection = acceptedCurrencies.map((c) => {
        if (c.currency === currency) {
          return { currency, selected: !c.selected };
        } else {
          return { currency: c.currency, selected: c.selected };
        }
      });
      setAcceptedCurrencies(newSelection);
    }
  };

  return (
    <div
      className={`${
        className || ""
      } grid grid-cols-2 md:grid-cols-5 gap-2 justify-center`}
    >
      {acceptedCurrencies.map((c) => {
        return (
          <div
            key={c.currency}
            className={`flex items-center justify-center rounded-lg px-2 py-1 space-x-2 text-sm ${
              c.selected
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            } ${readonly ? "cursor-not-allowed" : "cursor-pointer"} `}
            onClick={() => {
              toggleSelection(c.currency);
            }}
          >
            <CurrencyLogo name={c.currency} size={24} />
            <h1 className="font-semibold">{c.currency}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencySelection;
