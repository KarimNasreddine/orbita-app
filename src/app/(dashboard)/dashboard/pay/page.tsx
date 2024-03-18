import CreateContract from "@/components/ui/contract/CreateContract";
import { PaymentCurrency } from "@/types/payment";
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
    } else if (
      !Object.values(PaymentCurrency as any).includes(totalAmountCurrency)
    ) {
      return false;
    }
  }
  return true;
};

const validatePrice = (price?: string) => {
  const priceArray = price?.trim().match(/([\d+.*]+)([A-Z]*)/);
  if (priceArray) {
    try {
      const totalAmount = Number(priceArray[1]).toFixed(2);
      const totalAmountCurrency = priceArray[2];
      const isPriceValid = validateTotalPriceAndCurrency(
        totalAmount,
        totalAmountCurrency
      );
      return isPriceValid;
    } catch (e) {
      return false;
    }
  } else return true;
};

const validateSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  if (
    !searchParams.payment_id ||
    !searchParams.return_url
  ) {
    throw new Error("Missing required parameters");
  }
  if (!validatePrice(searchParams.price as string)) {
    throw new Error("Invalid price value");
  }
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  validateSearchParams(searchParams);
  const paymentId: string = searchParams.payment_id as string;
  const price: string | undefined = searchParams.price as string;
  const return_url: string = searchParams.return_url as string;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-lg grid grid-cols-1 justify-center items-center mt-12">
        <CreateContract
          paymentId={paymentId}
          price={price}
          return_url={return_url}
        />
      </div>
    </div>
  );
};

export default Page;
