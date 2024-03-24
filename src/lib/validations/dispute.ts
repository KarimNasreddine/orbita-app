import { z } from "zod";

export const disputeValidator = z.object({
  disputeId: z.string(),
  merchantAddress: z.string(),
  clientAddress: z.string(),
  expiryDate: z.string(), // Assuming expiryDate is a string in ISO format
});

export type Dispute = z.infer<typeof disputeValidator>;
