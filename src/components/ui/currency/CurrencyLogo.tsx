import { Currency } from "@/types/payment";


const ORBTLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63ad6b66917c0cf702279e1e_Copy%20of%20Orbita%24-p-500.png";
const USDCLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63ad6b7d3ca69813b1e3d43a_usd-coin-usdc-logo-p-500.png";
const NBTCLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63ad69c0dd43e2ba806e6c55_3838998_bitcoin_cryptocurrency_currency_money_finance_icon-p-500.png";
const AKTLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63ad6bce111f581fba48268b_2307fd8e946147eb9f97df1e2d392d92.png";
const ATOMLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63ad6bf70d2529658ee9deb5_cosmos-atom-logo-p-500.png";
const SafeLogoURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63b00a9a1e34a74a86af4349_Safe%20Logo.png";
const OrbitaPayURL =
  "https://assets.website-files.com/632b835e3a4bd43a0a3d755e/63aec190b337a69acef67f65_ORBITAPAY%20ORIGINAL%20LOGO%20INVERTED.png";

type CurrencyLogoProps = {
  name: Currency;
  size?: number;
};

const CurrencyLogo = ({ name, size }: CurrencyLogoProps) => {
  let source = "";
  switch (name) {
    case Currency.ORBT: {
      source = ORBTLogoURL;
      break;
    }

    case Currency.USDC: {
      source = USDCLogoURL;
      break;
    }

    case Currency.NBTC: {
      source = NBTCLogoURL;
      break;
    }
    case Currency.AKT: {
      source = AKTLogoURL;
      break;
    }
    case Currency.ATOM: {
      source = ATOMLogoURL;
      break;
    }
    default: {
      break;
    }
  }
  return <img src={source} alt={name} width={size} />;
};

export default CurrencyLogo;
