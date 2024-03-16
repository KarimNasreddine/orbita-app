import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/CreatePaymentContext";

const DirectPaymentForm: React.FC = () => {
  const { mode, paymentName, paymentAmount, paymentAddress } =
    useCreatePaymentContext();
  const { setPaymentName, setPaymentAmount, setPaymentAddress } =
    useCreatePaymentDispatchContext();

  const handlePaymentNameChange = (e) => {
    e.preventDefault();
    const paymentName = e.target.value;
    setPaymentName(paymentName);
  };

  const handlePaymentAmountChange = (e) => {
    e.preventDefault();
    const paymentAmountTarget = e.target.value;
    const isValid = /^[0-9]*(\.[0-9]*)?$/.test(paymentAmountTarget);
    if (isValid) {
      setPaymentAmount(paymentAmountTarget);
    }
  };

  const handlePaymentAddressChange = (e) => {
    e.preventDefault();
    const paymentAddress = e.target.value;
    setPaymentAddress(paymentAddress);
  };

  return (
    <div className="grid grid-rows-subgrid row-span-4">
      <div>
        <h1 className="font-bold text-2xl mb-2">{`Direct Irreversible Payment ${
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

      <div>
        <label className="block mb-2 font-semibold" htmlFor="paymentAmount">
          Payment Amount (USD)
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

export default DirectPaymentForm;
