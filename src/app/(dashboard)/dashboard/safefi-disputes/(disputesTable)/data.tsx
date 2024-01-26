type Dispute = {
  merchantName: string;
  transactionID: number;
  amount: string;
  resolvedDate: string;
  Verdict: "In your favour" | "Not in your favour";
  Details: string;
};

export const data: Dispute[] = [
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 988,
    amount: "$30 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "Not in your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 988,
    amount: "$30 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "Not in your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 988,
    amount: "$30 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "Not in your favour",
    Details: "View details",
  },
  {
    merchantName: "ALIEXPRESS.COM",
    transactionID: 987,
    amount: "$80 USDC",
    resolvedDate: "JANUARY 3RD 2025",
    Verdict: "In your favour",
    Details: "View details",
  },
];
