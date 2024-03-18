"use client";

import { AcceptedCurrency, Currency } from "@/types/payment";
import CurrencyLogo from "../currency/CurrencyLogo";
import { useMemo, useState } from "react";
import { usePayment } from "@/def-hooks/usePayment";
import Spinner from "../spinner/Spinner";
import { useCreateContract } from "@/def-hooks/useCreateContract";

type Props = {
  paymentId: string;
  return_url: string;
  price?: string;
};

const testCurrencies: AcceptedCurrency[] = [
  { currency: Currency.USDC, selected: false },
  { currency: Currency.NBTC, selected: false },
];

const CreateContract: React.FC<Props> = ({ paymentId, price }) => {
  const {
    payment,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = usePayment(paymentId, true);
  const { createContract } = useCreateContract();
  const [selectedCurrencies, setSelectedCurrencies] = useState(testCurrencies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const toggleSelection = (currency: Currency) => {
    let newSelection: { currency: Currency; selected: boolean }[] = [];

    newSelection = selectedCurrencies.map((c) => {
      if (c.currency === currency) {
        return { currency, selected: true };
      } else {
        return { currency: c.currency, selected: false };
      }
    });
    setSelectedCurrencies(newSelection);
  };

  const isValidTx = useMemo(() => {
    return selectedCurrencies.some((c) => c.selected);
  }, [selectedCurrencies]);

  if (paymentError) {
    throw new Error("Cannot find Payment ID");
  } else if (!payment && isPaymentLoading) {
    return (
      <div className="rounded-xl border text-black bg-white min-h-[30rem] grid grid-rows-[1fr,auto] gap-4 p-6">
        <div>
          <h1 className="font-bold text-2xl mb-2 text-center">{`Orbita Pay`}</h1>
          <div className="mt-10">
            <Spinner width={10} height={10} />
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center">
          <button
            className={`max-w-sm w-full py-2 px-4 rounded  bg-orbita-iris text-white`}
            disabled={true}
          >
            {"Pay"}
          </button>
        </div>
      </div>
    );
  } else if (!payment) {
    throw new Error("Cannot find Payment ID");
  } else {
    const { id, name, priceAmount, priceCurrency } = payment;
    if (!price && !priceAmount) {
      throw new Error("Invalid price data");
    }

    const validatePrice = (price?: string) => {
        const priceArray = price?.trim().match(/([\d+.*]+)([A-Z]*)/);
        if (priceArray) {
          try {
            const totalAmount = Number(priceArray[1]).toFixed(2);
            return totalAmount;
          } catch (e) {
            throw new Error("Invalid price data");
          }
        } else throw new Error("Invalid price data");
      };

    const handleCreateContract = async () => {
      if (!id || !priceCurrency) {
        setError("Invalid payment data");
        return;
      }
      const selectedCurrency = selectedCurrencies.find(
        (c) => c.selected
      )?.currency;
      if (!selectedCurrency) {
        setError("Please select at least one currency");
        return;
      }

      const validatedPrice = validatePrice(price);

      try {
        setLoading(true);
        setError("");
        setSuccess(false);
        const result = await createContract({
          paymentID: Number(id),
          payWithCurrency: selectedCurrency,
          totalAmount: validatedPrice || priceAmount || "",
          totalAmountCurrency: priceCurrency,
        });
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
        setLoading(false);
      }
    };

    return (
      <div className="rounded-xl border text-black bg-white min-h-[30rem] grid grid-rows-[1fr,1fr,auto,1fr,auto] gap-4 p-6">
        <div>
          <h1 className="font-bold text-2xl mb-2 text-center">{name}</h1>
          {loading ? (
            <div className="mt-10">
              <Spinner width={10} height={10} />
            </div>
          ) : !isValidTx ? (
            <div className="mt-10 text-center font-bold text-red-500">
              {"Please select at least one currency"}
            </div>
          ) : error ? (
            <div className="mt-10 text-center font-bold text-red-500">
              {error}
            </div>
          ) : (
            success && (
              <div className="mt-10 text-center font-bold text-green-500">
                {"Payment Sent Successfully!"}
              </div>
            )
          )}
        </div>
        <div className="border-y border-divider-lines py-2 grid grid-rows-1 justify-center items-center">
          <h1 className="font-bold text-2xl mb-2 text-center text-orbita-iris">
            <span className="text-black">Total:</span>{" "}
            {price ? price : `"${priceAmount}" "${priceCurrency}"`}
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="font-bold text-xl">Pay With:</h1>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-2 justify-center`}>
          {selectedCurrencies.map((c) => {
            return (
              <div
                key={c.currency}
                className={`flex h-10 items-center justify-center rounded-lg px-2 py-1 space-x-2 text-sm ${
                  c.selected
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }  cursor-pointer `}
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
        <div className="grid grid-cols-1 justify-items-center">
          <button
            className={`max-w-sm w-full py-2 px-4 rounded  bg-orbita-iris hover:bg-purple-700 text-white`}
            onClick={handleCreateContract}
            disabled={!isValidTx}
          >
            {"Pay"}
          </button>
        </div>
      </div>
    );
  }
};

export default CreateContract;
