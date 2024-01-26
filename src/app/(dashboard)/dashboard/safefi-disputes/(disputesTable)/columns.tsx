"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Dispute = {
  merchantName: string;
  transactionID: number;
  amount: string;
  resolvedDate: string;
  Verdict: "In your favour" | "Not in your favour";
  Details: string;
};

export const columns: ColumnDef<Dispute>[] = [
  {
    id: "merchantName",
    header: "Merchant Name",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.merchantName}</span>;
    },
  },
  {
    id: "transactionID",
    header: "Transaction ID",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.transactionID}</span>;
    },
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.amount}</span>;
    },
  },
  {
    id: "resolvedDate",
    header: "Resolved Date",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.resolvedDate}</span>;
    },
  },
  {
    id: "Verdict",
    header: "Verdict",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.Verdict}</span>;
    },
  },
  {
    id: "Details",
    header: "Details",
    cell: ({ row }) => {
      const dispute = row.original;

      return <span>{dispute.Details}</span>;
    },
  },
];
