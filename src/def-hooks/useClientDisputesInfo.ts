import { useEffect, useState } from "react";
import { useAddressContext } from "./addressContext";
import { useDisputes } from "./useDisputes";
import { useContracts } from "./useContracts";
import { OrbitapayPayment } from "ts-client/orbita.pay/rest";
import {
  Contract,
  DisputeWithContract,
  DisputesInterface,
} from "@/utils/interfaces";
import { useContractsFromAccountAddress } from "./useContractsFromAccountAddress";
import isEqual from "lodash/isEqual";
import { db } from "@/lib/db";

export const useClientDisputesInfo = () => {
  const { address } = useAddressContext();

  /** if useRef is used instead of useState
   * 
  const payments = useRef<OrbitapayPayment[] | undefined>([]);
  const contracts = useRef<OrbitapayContract[] | undefined>([]);
  const disputes = useRef<OrbitapayDispute[] | undefined>([]);

  const disputesOpened = useRef<
    {
      contractName: string | undefined;
      transactionID: string | undefined;
      amount: string | undefined;
      initiatedDate: string | undefined;
      daysLeft: string | undefined;
    }[]
  >([]);

  const disputesResolved = useRef<
    {
      contractName: string | undefined;
      transactionID: string | undefined;
      amount: string | undefined;
      resolvedDate: string | undefined;
      Verdict: string | undefined;
    }[]
  >([]);
  */

  const [disputesOpened, setDisputesOpened] = useState<
    DisputesInterface["opened"]
  >([]);

  const [disputesResolved, setDisputesResolved] = useState<
    DisputesInterface["resolved"]
  >([]);

  const { disputes: disputesRaw } = useDisputes();

  const { contracts: contractsClientRaw } = useContracts(0);

  // const { payments: paymentsRaw } = usePayments(0);

  // console.log("paymentsRaw?.payments:", paymentsRaw?.payments);

  // Get all payment Ids from the payments array
  // const paymentIds = paymentsRaw?.payments?.map((p) => p.id);

  // console.log("paymentIds:", paymentIds);

  const { contracts: contractsMerchantRaw } = useContractsFromAccountAddress(
    address,
    0
  );

  // console.log("contractsClientRaw:", contractsClientRaw);
  // console.log("contractsMerchantRaw:", contractsMerchantRaw);

  useEffect(() => {
    const dispute = disputesRaw.disputeAllData?.pages[0]?.Dispute;

    console.log("dispute:", dispute);

    const isMerchant = (address: string) => {
      return dispute?.some((c) => c.merchant === address);
    };

    // console.log("isMerchant:", isMerchant(address));

    let contract: Record<string, OrbitapayPayment> | undefined = {};

    if (isMerchant(address)) {
      // console.log("dispute:", dispute);
      // console.log("paymentsRaw:", paymentsRaw);
      // loop through the disputes and return the contract associated with each dispute in a map where the key is the dispute ID
      contract = dispute?.reduce((acc, d) => {
        if (d.contractID && d.id) {
          const contract = contractsMerchantRaw?.contracts.find(
            (c) => c.id === d.contractID
          );
          if (contract) {
            acc[d.id] = contract;
          }
        }
        return acc;
      }, {} as Record<string, OrbitapayPayment>);
    } else {
      // loop through the disputes and return the contract associated with each dispute in a map where the key is the dispute ID
      contract = dispute?.reduce((acc, d) => {
        if (d.contractID && d.id) {
          const contract = contractsClientRaw?.payments.find(
            (c) => c.id === d.contractID
          );
          if (contract) {
            acc[d.id] = contract;
          }
        }
        return acc;
      }, {} as Record<string, OrbitapayPayment>);

      console.log("dispute:", dispute);
      console.log("contract:", contract);
    }

    const disputeWithContract: DisputeWithContract[] = (dispute || []).map(
      (d) => {
        if (d?.id && contract && contract[d.id]) {
          return {
            ...d,
            contract: contract[d.id] as unknown as Contract,
          };
        }
        return {
          id: undefined,
          creator: undefined,
          merchant: undefined,
          amount: undefined,
          status: undefined,
          contractID: undefined,
          createdAt: undefined,
          resolvedAt: undefined,
          contract: undefined,
        };
      }
    );

    const disputesAll: DisputesInterface = disputeWithContract?.reduce(
      (acc: DisputesInterface, d) => {
        if (d.status === "opened" && d.contract) {
          if (d.createdAt) {
            const createdAt = new Date(d.createdAt);
            const endsAt = new Date();
            endsAt.setDate(
              createdAt.getDate() + Number(d.contract.safetyPeriod)
            );

            // transform the daysLeft into an integer of number of days left
            const daysLeft = Math.floor(
              (endsAt.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
            ).toString();

            acc.opened.push({
              creator: d.creator,
              merchant: d.merchant,
              contractName: d.contract.name,
              transactionID: d.id,
              amount: `${d.amount} ${d.contract.priceCurrency}`,
              initiatedDate: d.createdAt,
              daysLeft: daysLeft,
              disputeID: d.id,
            });
          }
        } else if (d.status === "resolved" && d.contract) {
          acc.resolved.push({
            creator: d.creator,
            contractName: d.contract.name,
            transactionID: d.id,
            amount: `${d.amount} ${d.contract.priceCurrency}`,
            resolvedDate: d.resolvedAt,
            Verdict: d.verdict,
          });
        }
        return acc;
      },
      { opened: [], resolved: [] }
    );

    // disputesOpened.current = disputesAll.opened;
    // disputesResolved.current = disputesAll.resolved;

    if (
      !isEqual(disputesOpened, disputesAll.opened) ||
      !isEqual(disputesResolved, disputesAll.resolved)
    ) {
      setDisputesOpened(disputesAll.opened);
      setDisputesResolved(disputesAll.resolved);
    }

    console.log("disputesOpened:", disputesOpened);
    console.log("disputesResolved:", disputesResolved);
  }, [disputesRaw, contractsClientRaw, address]);

  disputesOpened.forEach(async (dispute) => {
    const today = new Date();
    const daysLeft = Number(dispute.daysLeft);
    const expiryDate = new Date(today.setDate(today.getDate() + daysLeft))
      .toISOString()
      .split("T")[0];

    await db.hset(`dispute:${dispute.transactionID}`, {
      merchantAddress: dispute.merchant,
      clientAddress: dispute.creator,
      expiryDate: expiryDate,
    });
  });

  return { disputesOpened, disputesResolved };
};
