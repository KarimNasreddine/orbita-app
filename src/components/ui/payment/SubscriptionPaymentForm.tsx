import { useEffect } from "react";
import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/CreatePaymentContext";

const SubscriptionPaymentForm: React.FC = () => {
  const {
    paymentName,
    paymentAddress,
    paymentAmount,
    mode,
    recurringTimeFrame,
    recurringTimeFrameInterval,
    leniencyAmount,
  } = useCreatePaymentContext();

  const {
    setPaymentName,
    setPaymentAmount,
    setPaymentAddress,
    setRecurringTimeFrame,
    setRecurringTimeFrameInterval,
    setLeniency,
  } = useCreatePaymentDispatchContext();

  const isNumberValid = (value: string) => {
    return /^[0-9]*(\.[0-9]*)?$/.test(value);
  };

  const handlePaymentNameChange = (e) => {
    e.preventDefault();
    const paymentName = e.target.value;
    setPaymentName(paymentName);
  };

  const handlePaymentAmountChange = (e) => {
    e.preventDefault();
    const paymentAmountTarget = e.target.value;
    const isValid = isNumberValid(paymentAmountTarget);
    if (isValid) {
      setPaymentAmount(paymentAmountTarget);
    }
  };

  const handlePaymentAddressChange = (e) => {
    e.preventDefault();
    const paymentAddress = e.target.value;
    setPaymentAddress(paymentAddress);
  };

  const handleRecurringTimeFrameChange = (e) => {
    e.preventDefault();
    const recurringTimeFrameTarget = e.target.value;
    const isValid = isNumberValid(recurringTimeFrameTarget);
    if (isValid) {
      setRecurringTimeFrame(recurringTimeFrameTarget);
    }
  };

  const handleRecurringTimeFrameIntervalChange = (e) => {
    e.preventDefault();
    const recurringTimeFrameInterval = e.target.value;
    setRecurringTimeFrameInterval(recurringTimeFrameInterval);
  };

  const handleLeniencyChange = (e) => {
    const leniencyTarget = e.target.value;
    const isValid = isNumberValid(leniencyTarget);
    if (isValid) {
      setLeniency(leniencyTarget);
    }
  };


  return (
    <div className="grid grid-rows-subgrid row-span-5">
      <div>
        <h1 className="font-bold text-2xl mb-2">{`Recurring Irreversible Payment (Subscription) ${
          mode === "business" ? "- Business" : ""
        }`}</h1>
      </div>
      <div>
        <label className="block mb-2 font-semibold" htmlFor="paymentName">
          {`${mode === "business" ? "Business Website" : "Payment Name"}`}
        </label>
        <input
          type="text"
          id="paymentName"
          name="paymentName"
          value={paymentName}
          onChange={handlePaymentNameChange}
          className="mb-4 w-full px-3 py-2 border rounded rounded-lg"
          placeholder="NFT Mystery Box"
        />
      </div>

      <div className="grid grid-rows-2">
        <div>
          <label className="block mb-2 font-semibold" htmlFor="paymentAmount">
            Subscription Amount (USD)
          </label>
          <input
            type="text"
            id="paymentAmount"
            name="paymentAmount"
            value={paymentAmount}
            onChange={handlePaymentAmountChange}
            placeholder={`${
              mode === "business"
                ? "Calculated at Client Checkout"
                : "Example: $100"
            }`}
            className={`mb-4 w-full px-3 py-2 border rounded-lg ${
              mode === "business" &&
              " text-center text-black bg-gray-100 cursor-not-allowed"
            }`}
            disabled={mode === "business"}
          />
        </div>
        <div
          className={`grid ${
            mode === "business" ? "grid-cols-2" : "grid-cols-1"
          } items-end gap-4`}
        >
          <div className="grid grid-cols-2 gap-2 items-end">
            <div>
              <label
                className="block mb-2 font-semibold"
                htmlFor="recurringTimeFrame"
              >
                Recurring Time Frame
              </label>
              <input
                type="text"
                id="recurringTimeFrame"
                name="recurringTimeFrame"
                value={recurringTimeFrame}
                onChange={handleRecurringTimeFrameChange}
                className="mb-4 w-full px-3 py-2 border rounded-lg"
                placeholder="14"
              />
            </div>
            <div>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-lg"
                value={recurringTimeFrameInterval}
                onChange={handleRecurringTimeFrameIntervalChange}
              >
                <option value={"days"}>Days</option>
                <option value={"weeks"}>Weeks</option>
                <option value={"months"}>Months</option>
                <option value={"years"}>Years</option>
              </select>
            </div>
          </div>
          {mode === "business" && (
            <div className="grid grid-cols-2 gap-2 items-end">
              <div>
                <label className="block mb-2 font-semibold" htmlFor="leniency">
                  Leniency
                </label>
                <input
                  type="text"
                  id="leniency"
                  name="leniency"
                  value={leniencyAmount}
                  onChange={handleLeniencyChange}
                  className="mb-4 w-full px-3 py-2 border rounded-lg"
                  placeholder="3"
                />
              </div>
              <div>
                <select
                  className="mb-4 w-full px-3 py-2 border rounded-lg"
                  value={"days"}
                  disabled={true}
                >
                  <option value={"days"}>Days</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold" htmlFor="paymentAddress">
          Orbita Payout Address
        </label>
        <input
          type="text"
          id="paymentAddress"
          name="paymentAddress"
          value={paymentAddress}
          onChange={handlePaymentAddressChange}
          className="mb-4 w-full px-3 py-2 border rounded-lg"
          placeholder="Example: orbita1erAzumt4026ehDFdowk590h9a74dpRGahr5KJ5"
        />
      </div>
    </div>
  );
};

export default SubscriptionPaymentForm;
