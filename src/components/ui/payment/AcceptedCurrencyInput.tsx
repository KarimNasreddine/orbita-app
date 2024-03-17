import CurrencySelection from "../currency/CurrencySelection";

type Props = {
  readonly?: boolean;
  singleSelect?: boolean;
};

const AcceptedCurrencyInput: React.FC<Props> = ({
  readonly = false,
  singleSelect = false,
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">Accepted Payments</label>
      <CurrencySelection readonly={readonly} singleSelect={singleSelect} />
    </div>
  );
};

export default AcceptedCurrencyInput;
