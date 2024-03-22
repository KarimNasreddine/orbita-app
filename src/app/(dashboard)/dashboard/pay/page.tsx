import CreateContract from "@/components/ui/contract/CreateContract";
import { CheckoutData } from "@/types/checkout";
import { PaymentCurrency, isValidPaymentCurrency } from "@/types/currency";
import BigNumber from "bignumber.js";

const validateTotalPriceAndCurrency = (
  totalAmount: string,
  totalAmountCurrency: string
): boolean => {
  if (totalAmount === "" || totalAmountCurrency === "") {
    return false;
  } else {
    const totalAmountNumber = new BigNumber(totalAmount);
    if (!totalAmountNumber.isPositive() || totalAmountNumber.isZero()) {
      return false;
    } else if (!isValidPaymentCurrency(totalAmountCurrency)) {
      return false;
    }
  }
  return true;
};

const validatePrice = (price: string) => {
  const priceArray = price.trim().match(/([\d+.*]+)([A-Z]*)/);
  if (priceArray) {
    try {
      const totalAmount = Number(priceArray[1]).toString();
      const totalAmountCurrency = priceArray[2];
      const isPriceValid = validateTotalPriceAndCurrency(
        totalAmount,
        totalAmountCurrency
      );
      if (!isPriceValid) throw new Error("Invalid price value");
      return {
        price: totalAmount,
        currency: totalAmountCurrency as PaymentCurrency,
      };
    } catch (e) {
      throw new Error("Invalid price value");
    }
  } else throw new Error("Invalid price value");
};

const validateSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  if (!searchParams.payment_id || !searchParams.return_url) {
    throw new Error("Missing required parameters");
  }
  const payment_id = searchParams.payment_id as string;
  const return_url = searchParams.return_url as string;
  let price: string | undefined;
  let currency: PaymentCurrency | undefined;
  if (searchParams.price) {
    ({ price, currency } = validatePrice(searchParams.price as string));
  }

  const checkout_id = searchParams.checkout_id as string;
  return { payment_id, price, currency, return_url, checkout_id };
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const {
    payment_id: paymentId,
    price,
    return_url,
    currency,
    checkout_id,
  } = validateSearchParams(searchParams);

  const getCheckoutData = async (checkoutId: string): Promise<CheckoutData> => {
    "use server";
    const response = await fetch(
      `${process.env.URL}/api/checkout/${checkoutId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const checkoutData = (await response.json()) as CheckoutData;
    return checkoutData;
  };

  const checkoutData = checkout_id
    ? await getCheckoutData(checkout_id)
    : undefined;
  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-lg grid grid-cols-1 justify-center items-center mt-12">
        <CreateContract
          paymentId={paymentId}
          price={price}
          priceCurrency={currency}
          return_url={return_url}
          checkoutData={checkoutData}
        />
      </div>
    </div>
  );
};

export default Page;
