export interface Account {
  address: string;
  pathIncrement: Nullable<number>;
}
export type Nullable<T> = T | null;

export type Wallet = {
  name: string | null;
  address: string | null;
  signature: string | null;
  publicKey: string | null;
};
export type WalletDispatch = {
  connectWithKeplr: () => Promise<void>;
  signOut: () => void;
};
export type Amount = {
  amount: string;
  denom: string;
};
export type ColoredAmount = Amount & { color: string };
export interface DenomTrace {
  denom_trace: { path: string; base_denom: string };
}
export interface DenomTraces {
  [key: string]: DenomTrace;
}
export type Block = {
  height: number;
} & {
  [key: string]: string | undefined;
};
export interface IBCAckHeights {
  packetHeightA: number;
  packetHeightB: number;
  ackHeightA: number;
  ackHeightB: number;
}
export interface IBCEndpoint {
  clientID: string;
  connectionID: string;
}
export interface IBCChannel {
  portId?: string;
  channelId: string;
}
export interface Relayer {
  name: string;
  prefix?: string;
  endpoint?: string;
  gasPrice?: string;
  external: boolean;
  status: "connected" | "linked" | "created";
  heights?: IBCAckHeights;
  running?: boolean;
  chainIdA?: string;
  chainIdB: string;
  targetAddress?: string;
  endA?: IBCEndpoint;
  endB?: IBCEndpoint;
  src: IBCChannel;
  dest?: IBCChannel;
}

export interface Transactions {
  txs: Array<RawTransaction>;
  tx_responses: Array<RawTransactionResponse>;
}
export type RawTransactionResponse = {
  height: number;
  code: number;
} & {
  [key: string]: string | undefined;
};
export interface TxPacket {
  data: string;
  source_port: string;
  source_channel: string;
  destination_port: string;
  destination_channel: string;
}
export interface TxDecodedPacket {
  sender?: string;
  receiver?: string;
  amount?: string;
  denom?: string;
}
export interface TxMessage {
  "@type": string;
  packet?: TxPacket;
  signer: string;
  connection_id?: string;
  client_id?: string;
  amount?: Amount[];
  token?: Amount;
  counterparty_connection_id?: string;
  previous_connection_id?: string;
  from_address?: string;
  to_address?: string;
  sender?: string;
  receiver?: string;
  port_id?: string;
  channel_id?: string;
  source_channel?: string;
  counterparty_version?: string;
  previous_channel_id?: string;
}
export interface TxBody {
  messages: Array<TxMessage>;
}
export type RawTransaction = {
  response: RawTransactionResponse;
  body: TxBody;
} & {
  [key: string]: unknown;
};
export type Transaction = RawTransaction & {
  [key: string]: unknown;
};
export interface SpTypeObject {
  id?: string;
  creator?: string;
  [key: string]: string | undefined;
}
export interface Field {
  name: string;
  type: string;
}
export type AmountWithMeta = Amount & {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
};

// New interfaces

// Payment Interfaces

export enum UI_STATE_PAYMENT {
  "FRESH" = 1,

  "BOOTSTRAPED" = 2,

  "WALLET_LOCKED" = 3,

  "SEND" = 100,
  "SEND_ADD_TOKEN" = 101,

  "TX_SIGNING" = 300,
  "TX_SUCCESS" = 301,
  "TX_ERROR" = 302,
}

export interface TxData_CreatePayment {
  acceptedPaymentType: string;
  subscriptionType: string;
  name: string;
  priceAmount: string;
  priceCurrency: string;
  recurringtimeframe: string;
  recurringTimeFrameAmount: string;
  merchantPayoutAddress: string;
  paymentLeniency: string;
  paymentMode: string;
  paymentType: string;
  safetyPeriod: string;
  memo: string;
  fees: Array<Amount>;
}

export interface State_CreatePayment {
  tx: TxData_CreatePayment;
  currentUIState: UI_STATE_PAYMENT;
  modalOpen: boolean;
}

export interface TxData_QueryPayment {
  paymentID: string;
  memo: string;
  fees: Array<Amount>;
}

export interface State_QueryPayment {
  tx: TxData_QueryPayment;
  currentUIState: UI_STATE_PAYMENT;
  modalOpen: boolean;
  selectedPaymentID: string;
  selectedPaymentName: string;
  selectedPriceAmount: string;
  selectedPriceCurrency: string;
  selectedRecurringAmount: string;
  selectedRecurringTimeFrame: string;
}

// Contract Interfaces

export enum UI_STATE_CONTRACT {
  "SEND" = 100,
  "TX_SIGNING" = 300,
  "TX_SUCCESS" = 301,
  "TX_ERROR" = 302,
}

export interface TxData_CreateContract {
  acceptedPaymentType: string;
  paymentID: string;
  clientWalletAddress: string;
  paymentLeniencyCounter: string;
  memo: string;
  fees: Array<Amount>;
}

export interface State_CreateContract {
  tx: TxData_CreateContract;
  currentUIState: UI_STATE_CONTRACT;
  modalOpen: boolean;
  notification: boolean;
}

export interface TxData_QueryContract {
  contractID: string;
  memo: string;
  fees: Array<Amount>;
}

// Dispute Interfaces

export enum UI_STATE_DISPUTE {
  "SEND" = 100,
  "TX_SIGNING" = 300,
  "TX_SUCCESS" = 301,
  "TX_ERROR" = 302,
}

export interface TxData_CreateDispute {
  creator: string;
  merchant: string;
  amount: string;
  contractID: string;
  memo: string;
  fees: Array<Amount>;
}

export interface State_Dispute {
  tx: TxData_CreateDispute;
  currentUIState: UI_STATE_DISPUTE;
  modalOpen: boolean;
  notification: boolean;
}

export interface TxData_QueryDispute {
  disputeID: string;
  memo: string;
  fees: Array<Amount>;
}

export interface TxData_UpdateDispute {
  creator: string;
  disputeID: string;
  verdict: string;
  memo: string;
  fees: Array<Amount>;
}

export interface State_UpdateDispute {
  tx: TxData_UpdateDispute;
  currentUIState: UI_STATE_DISPUTE;
  modalOpen: boolean;
  notification: boolean;
}

export interface TxData_CancelDispute {
  disputeID: string;
  memo: string;
  fees: Array<Amount>;
}
