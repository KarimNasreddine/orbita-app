import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/createPaymentContext";

const PaymentAmountInput = () => {
  const {
    mode,
    paymentType,
    paymentAmount,
    paymentCurrency,
    recurringTimeFrame,
    recurringTimeFrameInterval,
    leniencyAmount,
    safetyPeriodAmount,
  } = useCreatePaymentContext();
  const {
    setPaymentAmount,
    setPaymentCurrency,
    setRecurringTimeFrame,
    setRecurringTimeFrameInterval,
    setLeniency,
    setSafetyPeriodAmount,
  } = useCreatePaymentDispatchContext();

  const isNumberValid = (value: string) => {
    return /^[0-9]*(\.[0-9]*)?$/.test(value);
  };

  const handlePaymentAmountChange = (e) => {
    e.preventDefault();
    const paymentAmountTarget = e.target.value;
    const isValid = /^[0-9]*(\.[0-9]*)?$/.test(paymentAmountTarget);
    if (isValid) {
      setPaymentAmount(paymentAmountTarget);
    }
  };

  const handlePaymentCurrencyChange = (e) => {
    e.preventDefault();
    const paymentCurrency = e.target.value;
    setPaymentCurrency(paymentCurrency);
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

  const handleSafetyPeriodAmountChange = (e) => {
    e.preventDefault();
    const safetyPeriodTarget = e.target.value;
    const isValid = isNumberValid(safetyPeriodTarget);
    if (isValid) {
      setSafetyPeriodAmount(safetyPeriodTarget);
    }
  };

  return (
    <div className={`grid grid-rows-${paymentType === "direct" ? "1" : "2"}`}>
      <div
        className={`grid grid-cols-${
          mode === "basic" ? "2" : "1"
        } items-end gap-2`}
      >
        <div>
          <label className="block mb-2 font-semibold" htmlFor="paymentAmount">
            {`${
              paymentType === "subscription" ? "Subscription" : "Payment"
            } Amount`}
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
            className={`mb-4 w-full px-3 py-2 border rounded rounded-lg ${
              mode === "business" &&
              " text-center text-black bg-gray-100 cursor-not-allowed"
            }`}
            disabled={mode === "business"}
          />
        </div>
        {mode === "basic" && (
          <div>
            <select
              className="mb-4 w-full px-3 py-2 border rounded-lg"
              value={paymentCurrency}
              onChange={handlePaymentCurrencyChange}
            >
              <option value={"USD"}>USD</option>
              <option value={"CAD"}>CAD</option>
              <option value={"BTC"}>BTC</option>
            </select>
          </div>
        )}
      </div>
      {paymentType === "subscription" && (
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
                  placeholder="Defaults to 3"
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
      )}
      {paymentType === "safefi" && (
        <div
          className={`grid ${
            mode === "basic" ? "grid-cols-2" : "grid-cols-1"
          } items-end gap-4`}
        >
          <div className="grid grid-cols-2 gap-2 items-end">
            <div>
              <label
                className="block mb-2 font-semibold"
                htmlFor="safetyPeriod"
              >
                Safety Period
              </label>
              <input
                type="text"
                id="safetyPeriod"
                name="safetyPeriod"
                value={safetyPeriodAmount}
                onChange={handleSafetyPeriodAmountChange}
                className="mb-4 w-full px-3 py-2 border rounded-lg"
                placeholder="14"
              />
            </div>
            <div>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-lg"
                value={"Days"}
                disabled={true}
              >
                <option value={"days"}>Days</option>
              </select>
            </div>
          </div>
          {mode === "basic" && (
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
                  placeholder="Defaults to 3"
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
      )}
    </div>
  );
};

export default PaymentAmountInput;
