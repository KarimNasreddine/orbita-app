"use client";

import {
  AcceptedCurrency,
  Currency,
  PaymentCurrency,
  formatPaymentPrice,
} from "@/types/currency";
import CurrencyLogo from "../currency/CurrencyLogo";
import { useMemo, useState } from "react";
import { usePayment } from "@/def-hooks/usePayment";
import Spinner from "../spinner/Spinner";
import { useCreateContract } from "@/def-hooks/useCreateContract";
import { CheckoutData } from "@/types/checkout";

type Props = {
  paymentId: string;
  return_url: string;
  price?: string;
  priceCurrency?: PaymentCurrency;
  checkoutData?: CheckoutData;
};

const testCurrencies: AcceptedCurrency[] = [
  { currency: Currency.USDC, selected: false },
  { currency: Currency.NBTC, selected: false },
];

const CreateContract: React.FC<Props> = ({
  paymentId,
  price,
  priceCurrency,
  checkoutData,
  return_url,
}) => {
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

  const isCurrencySelected = useMemo(() => {
    return selectedCurrencies.some((c) => c.selected);
  }, [selectedCurrencies]);

  const isPriceAvailable = useMemo(() => {
    return !!payment?.priceAmount || !!price;
  }, [payment, price]);

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
  } else if (checkoutData) {
    const {
      id,
      name,
      recurringTimeFrame,
      recurringTimeFrameAmount,
      paymentMode,
      paymentType,
      paymentLeniency,
      safetyPeriod,
    } = payment;
    const {
      totalAmount,
      totalAmountCurrency,
      items,
      paymentId: checkoutPaymentId,
    } = checkoutData;
    if (checkoutPaymentId !== Number(id)) {
      console.log(checkoutPaymentId, id);
      throw new Error("Invalid payment data");
    }
    if (!totalAmount || !totalAmountCurrency) {
      throw new Error("Invalid price data");
    }
    if (!items || items.length === 0) {
      throw new Error("Invalid checkout items data");
    }
    const formattedPaymentPrice = formatPaymentPrice(
      totalAmount,
      totalAmountCurrency
    );

    const handleCreateContract = async () => {
      setLoading(true);
      setError("");
      setSuccess(false);
      try {
        const selectedCurrency = selectedCurrencies.find(
          (c) => c.selected
        )?.currency;
        if (!selectedCurrency) {
          throw new Error("Please select at least one currency");
        }
        const result = await createContract({
          paymentID: checkoutPaymentId,
          payWithCurrency: selectedCurrency,
          totalAmount: totalAmount,
          totalAmountCurrency: totalAmountCurrency,
        });
        console.log(result);
        if (result.code) {
          setError("Unexpected Error. Please try again");
        } else {
          setSuccess(true);
          window.location.href = return_url;
        }
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="rounded-xl border text-black bg-white min-h-[30rem] grid grid-rows-[1fr,1fr,auto,auto,auto] gap-4 p-6">
        <div>
          <h1 className="font-bold text-2xl mb-2 text-center">{name}</h1>
          {loading ? (
            <div className="mt-10">
              <Spinner width={10} height={10} />
            </div>
          ) : !isCurrencySelected ? (
            <div className="mt-2 text-center font-bold text-red-500">
              {"Please select at least one currency"}
            </div>
          ) : error ? (
            <div className="mt-2 text-center font-bold text-red-500">
              {error}
            </div>
          ) : (
            success && (
              <div className="mt-2 text-center font-bold text-green-500">
                {"Payment Sent Successfully!"}
              </div>
            )
          )}
          <div className="my-4">
            <h1 className="font-bold text-xl">Checkout Items:</h1>
            <div className="mt-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-around items-center mb-2"
                >
                  <div className="text-sm font-medium">{item.itemName}</div>
                  <div className="text-sm">{`${
                    item.itemQuantity
                  } x $${formatPaymentPrice(
                    item.itemPriceAmount,
                    item.itemPriceCurrency
                  )}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-y border-divider-lines py-2 grid grid-rows-1 justify-center items-center">
          <h1 className="font-bold text-2xl  text-center text-orbita-iris">
            <span className="text-black">Total:</span>
            {` ${formattedPaymentPrice}`}
          </h1>
          <div className="my-2">
            {recurringTimeFrame && recurringTimeFrameAmount && (
              <p className="mb-2 whitespace-normal  break-words">
                {`Subscription: Every ${recurringTimeFrameAmount} ${recurringTimeFrame}`}
              </p>
            )}
            {((paymentMode === "business" && paymentType === "subscription") ||
              (paymentMode === "basic" && paymentType === "safefi")) && (
              <p className="mb-2 whitespace-normal  break-words">
                {`Leniency: ${paymentLeniency} days`}
              </p>
            )}
            {paymentType === "safefi" && (
              <p className="mb-2 whitespace-normal  break-words">
                {`Safety Period: ${safetyPeriod} days`}
              </p>
            )}
          </div>
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
        <div className="grid grid-cols-1 my-4 justify-items-center">
          <button
            className={`max-w-sm w-full py-2 px-4 rounded  bg-orbita-iris hover:bg-purple-700 text-white`}
            onClick={handleCreateContract}
            disabled={!isCurrencySelected}
          >
            {"Pay"}
          </button>
        </div>
      </div>
    );
  } else {
    const {
      id,
      name,
      priceAmount,
      priceCurrency: priceCurrencyOnChain,
      recurringTimeFrame,
      recurringTimeFrameAmount,
      paymentMode,
      paymentType,
      paymentLeniency,
      safetyPeriod,
    } = payment;
    if (!id) {
      throw new Error("Unexpected Error. Invalid payment data");
    }
    let currency: PaymentCurrency;
    try {
      currency = (priceCurrency || priceCurrencyOnChain) as PaymentCurrency;
    } catch (e) {
      throw new Error("Unexpected Error. Invalid payment data");
    }

    const formattedPaymentPrice = price
      ? ` ${formatPaymentPrice(price, currency)}`
      : priceAmount
      ? ` ${formatPaymentPrice(priceAmount, currency)}`
      : " Variable Price";

    const handleCreateContract = async () => {
      setLoading(true);
      setError("");
      setSuccess(false);
      try {
        const selectedCurrency = selectedCurrencies.find(
          (c) => c.selected
        )?.currency;
        if (!selectedCurrency) {
          throw new Error("Please select at least one currency");
        }

        const result = await createContract({
          paymentID: Number(id),
          payWithCurrency: selectedCurrency,
          totalAmount: price || priceAmount || "",
          totalAmountCurrency: currency,
        });
        console.log(result);
        if (result.code) {
          setError("Unexpected Error. Please try again");
        } else {
          setSuccess(true);
          window.location.href = return_url;
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
          ) : !isPriceAvailable ? (
            <div className="mt-10 text-center font-bold text-red-500">
              {
                "This Payment is a Variable Payment and can only be processed via Merchant Checkout."
              }
            </div>
          ) : !isCurrencySelected ? (
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
            <span className="text-black">Total:</span>
            {` ${formattedPaymentPrice}`}
          </h1>
          {recurringTimeFrame && recurringTimeFrameAmount && (
            <p className="mt-2 whitespace-normal  break-words">
              {`Subscription: Every ${recurringTimeFrameAmount} ${recurringTimeFrame}`}
            </p>
          )}
          {((paymentMode === "business" && paymentType === "subscription") ||
            (paymentMode === "basic" && paymentType === "safefi")) && (
            <p className="mt-2 whitespace-normal  break-words">
              {`Leniency: ${paymentLeniency} days`}
            </p>
          )}
          {paymentType === "safefi" && (
            <p className="mt-2 whitespace-normal  break-words">
              {`Safety Period: ${safetyPeriod} days`}
            </p>
          )}
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
            className={`max-w-sm w-full py-2 px-4 rounded bg-orbita-iris hover:bg-purple-700 text-white`}
            onClick={handleCreateContract}
            disabled={!isCurrencySelected || !isPriceAvailable}
          >
            {"Pay"}
          </button>
        </div>
      </div>
    );
  }
};

export default CreateContract;
