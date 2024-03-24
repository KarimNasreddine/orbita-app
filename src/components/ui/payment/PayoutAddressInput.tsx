import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/CreatePaymentContext";

const PayoutAddressInput = () => {
  const { paymentAddress } = useCreatePaymentContext();
  const { setPaymentAddress } = useCreatePaymentDispatchContext();

  const handlePaymentAddressChange = (e) => {
    e.preventDefault();
    const paymentAddress = e.target.value;
    setPaymentAddress(paymentAddress);
  };

  return (
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
  );
};

export default PayoutAddressInput;
