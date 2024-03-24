// pages/api/disputes/expired.ts
import { db } from "@/lib/db";

type redisDispute = {
  clientAddress: string;
  expiryDate: string;
  merchantAddress: string;
};

export async function GET() {
  const keys = await db.keys("dispute:*");
  const today = new Date().toISOString().split("T")[0];
  const expiredDisputes: (redisDispute & { disputeId: string })[] = []; // Update the type definition of expiredDisputes to include the disputeId property

  for (const key of keys) {
    const dispute: redisDispute | null = await db.hgetall(key);
    if (dispute!.expiryDate < today) {
      expiredDisputes.push({ ...dispute!, disputeId: key.split(":")[1] }); // Push the modified dispute object with the disputeId property into the expiredDisputes array
    }
  }

  console.log("expiredDisputes", expiredDisputes);

  return new Response(JSON.stringify(expiredDisputes), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
