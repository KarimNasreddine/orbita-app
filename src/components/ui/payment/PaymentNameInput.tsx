import {
  useCreatePaymentContext,
  useCreatePaymentDispatchContext,
} from "@/def-hooks/createPaymentContext";

const PaymentNameInput = () => {
  const { paymentName, mode } = useCreatePaymentContext();
  const { setPaymentName } = useCreatePaymentDispatchContext();

  const handlePaymentNameChange = (e) => {
    e.preventDefault();
    const paymentName = e.target.value;
    setPaymentName(paymentName);
  };

  return (
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
  );
};

export default PaymentNameInput;
