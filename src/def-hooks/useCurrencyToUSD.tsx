import { useState, useEffect } from "react";

async function queryUrl(url: string): Promise<Response> {
  try {
    console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// const useCurrencyToUSD = (ticker: string) => {
//   const [usdValue, setUsdValue] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any | null>(null);

//   useEffect(() => {
//     const fetchPrice = async () => {
//       try {
//         const url = `https://laozi1.bandchain.org/api/oracle/v1/request_prices?symbols=${ticker}`;
//         const response = await queryUrl(url);
//         const data = await response.json();

//         const px = data.price_results[0]?.px;
//         const multiplier = data.price_results[0]?.multiplier;

//         if (px && multiplier) {
//           let priceInUSD = px / multiplier;
//           priceInUSD = ticker === "uNBTC" ? priceInUSD / 1000000 : priceInUSD;
//           priceInUSD = ticker === "mUSDC" ? priceInUSD / 1000 : priceInUSD;
//           setUsdValue(priceInUSD);
//         } else {
//           setUsdValue(1);
//         }
//       } catch (e) {
//         setError(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrice();
//   }, [ticker]);

//   return { usdValue, loading, error };
// };

export async function getCurrencyInUSD(ticker: string): Promise<number> {
  try {
    let finalTicker = ticker;
    if (ticker === "uNBTC") {
      finalTicker = "BTC";
    } else if (ticker === "mUSDC") {
      finalTicker = "USDC";
    }

    const url = `https://laozi1.bandchain.org/api/oracle/v1/request_prices?symbols=${finalTicker}`;
    const response = await queryUrl(url);
    const data = await response.json();

    const px = data.price_results[0]?.px;
    const multiplier = data.price_results[0]?.multiplier;

    let priceInUSD = 1;
    if (px && multiplier) {
      priceInUSD = px / multiplier;

      priceInUSD = ticker === "uNBTC" ? priceInUSD / 1000000 : priceInUSD;
      priceInUSD = ticker === "mUSDC" ? priceInUSD / 1000 : priceInUSD;
    }
    console.log(priceInUSD);
    return priceInUSD;
  } catch (error) {
    let priceInUSD = 1;
    priceInUSD = ticker === "uNBTC" ? priceInUSD / 1000000 : priceInUSD;
    priceInUSD = ticker === "mUSDC" ? priceInUSD / 1000 : priceInUSD;
    return priceInUSD;
  }
}
