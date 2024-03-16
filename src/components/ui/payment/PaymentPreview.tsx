import { useCreatePayment } from "@/def-hooks/useCreatePayment";
import CurrencyLogo from "../currency/CurrencyLogo";
import { useCreatePaymentContext } from "@/def-hooks/CreatePaymentContext";
import { useMemo, useState } from "react";
import Spinner from "../spinner/Spinner";

const PaymentPreview: React.FC = () => {
  const payment = useCreatePaymentContext();
  const {
    mode,
    paymentType,
    paymentName,
    paymentAmount,
    paymentAddress,
    acceptedCurrencies,
    recurringTimeFrame,
    recurringTimeFrameInterval,
    safetyPeriodAmount,
    leniencyAmount,
  } = payment;
  const { isValidTx, createPayment } = useCreatePayment();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const isValid = useMemo(() => {
    return isValidTx(payment);
  }, [isValidTx, payment]);

  const handleCreatePayment = async () => {
    setIsLoading(true);
    setError("");
    setSuccess(false);
    try {
      const result = await createPayment(payment);
      console.log(result);
      if (result.code) {
        setError("Unexpected error occurred. Please try again");
      } else {
        setSuccess(true);
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const title =
    paymentType === "direct"
      ? "Direct Irreversible Payment"
      : paymentType === "subscription"
      ? "Recurring Irreversible Payment (Subscription)"
      : "SafeFi Reversible Payment";

  return (
    <div className="rounded-xl border text-black bg-white min-h-[40rem] grid grid-rows-[1fr,auto,auto,1fr,auto] gap-4 p-6">
      <div>
        <h1 className="font-bold text-2xl mb-2">{`${title} ${
          mode === "business" ? "- Business" : ""
        }`}</h1>
        {isLoading && (
          <div className="mt-10">
            <Spinner width={10} height={10} />
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center font-bold whitespace-normal break-words mt-6">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center font-bold whitespace-normal break-words mt-6">
            Payment Created Successfully
          </p>
        )}
      </div>
      <div className="border-y border-divider-lines py-2 grid grid-rows-1 justify-center items-center">
        <h1 className="font-bold text-2xl mb-2 text-center ">{paymentName}</h1>
      </div>
      <div className="grid grid-rows row-auto  gap-3">
        {paymentAmount && (
          <div className="grid grid-cols-2 items-end justify-between">
            <h1 className="font-bold text-lg">{`${
              paymentType === "subscription" ? "Subscription Price:" : "Price:"
            }`}</h1>

            <p className="whitespace-normal break-words text-orbita-iris text-lg font-bold">
              ${paymentAmount}
            </p>
          </div>
        )}
        {recurringTimeFrame && recurringTimeFrameInterval && (
          <div className="grid grid-cols-2 items-end justify-between">
            <h1 className="">Timeframe:</h1>

            <p className="whitespace-normal break-words">
              {`Every ${recurringTimeFrame} ${recurringTimeFrameInterval}`}
            </p>
          </div>
        )}
        {safetyPeriodAmount && (
          <div className="grid grid-cols-2 items-end justify-between">
            <h1 className="">Safety Period:</h1>

            <p className="whitespace-normal break-words">{`Within ${safetyPeriodAmount} Days`}</p>
          </div>
        )}

        {leniencyAmount && (
          <div className="grid grid-cols-2 items-end justify-between">
            <h1 className="">Leniency:</h1>

            <p className="whitespace-normal break-words">{`Within ${leniencyAmount} Days`}</p>
          </div>
        )}

        <div className="grid grid-cols-2 items-end justify-between">
          <h1 className="">Payout Address:</h1>
          {paymentAddress && (
            <p className="whitespace-normal break-words">
              {paymentAddress.substring(0, 4) +
                "..." +
                paymentAddress.slice(-4)}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-rows-2 gap-2 items-center justify-center">
        <h1 className="font-bold text-lg">Accepted Payments:</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {acceptedCurrencies.map(
            (currency, index) =>
              currency.selected && (
                <div key={index} className="flex items-center">
                  <CurrencyLogo name={currency.currency} size={32} />
                </div>
              )
          )}
        </div>
      </div>
      <div>
        <button
          className={`w-full py-2 px-4 rounded  bg-orbita-iris hover:bg-purple-700 text-white ${
            !isValid.success && "cursor-not-allowed"
          }`}
          disabled={!isValid.success}
          onClick={handleCreatePayment}
        >
          {"Create Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPreview;
