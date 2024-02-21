/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "orbita.pay";

export interface MsgCreatePayment {
  creator: string;
  subscriptionType: string;
  acceptedPaymentType: string;
  name: string;
  priceAmount: string;
  priceCurrency: string;
  recurringTimeFrame: string;
  recurringTimeFrameAmount: number;
  merchantPayoutAddress: string;
  paymentLeniency: number;
  paymentMode: string;
  paymentType: string;
  safetyPeriod: number;
  id: number;
}

export interface MsgCreatePaymentResponse {
  id: number;
}

export interface MsgCreateContract {
  id: number;
  creator: string;
  paymentID: number;
  clientWalletAddress: string;
  payWithCurrency: string;
  paymentLeniencyCounter: number;
  totalAmount: string;
  totalAmountCurrency: string;
}

export interface MsgCreateContractResponse {
  id: number;
}

export interface MsgCreateSubscriptionPayment {
  creator: string;
  contractID: number;
  nextPaymentAt: Date | undefined;
  id: number;
}

export interface MsgCreateSubscriptionPaymentResponse {
  id: number;
}

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgDeleteContract {
  creator: string;
  id: number;
}

export interface MsgDeleteContractResponse {
  id: number;
}

export interface MsgCreateDispute {
  id: number;
  creator: string;
  contractID: number;
  merchant: string;
  amount: string;
}

export interface MsgCreateDisputeResponse {
  id: number;
}

export interface MsgUpdateDispute {
  creator: string;
  id: number;
  verdict: string;
}

export interface MsgUpdateDisputeResponse {
  id: number;
}

export interface MsgCancelDispute {
  creator: string;
  id: number;
}

export interface MsgCancelDisputeResponse {
}

function createBaseMsgCreatePayment(): MsgCreatePayment {
  return {
    creator: "",
    subscriptionType: "",
    acceptedPaymentType: "",
    name: "",
    priceAmount: "",
    priceCurrency: "",
    recurringTimeFrame: "",
    recurringTimeFrameAmount: 0,
    merchantPayoutAddress: "",
    paymentLeniency: 0,
    paymentMode: "",
    paymentType: "",
    safetyPeriod: 0,
    id: 0,
  };
}

export const MsgCreatePayment = {
  encode(message: MsgCreatePayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.subscriptionType !== "") {
      writer.uint32(18).string(message.subscriptionType);
    }
    if (message.acceptedPaymentType !== "") {
      writer.uint32(26).string(message.acceptedPaymentType);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.priceAmount !== "") {
      writer.uint32(42).string(message.priceAmount);
    }
    if (message.priceCurrency !== "") {
      writer.uint32(50).string(message.priceCurrency);
    }
    if (message.recurringTimeFrame !== "") {
      writer.uint32(58).string(message.recurringTimeFrame);
    }
    if (message.recurringTimeFrameAmount !== 0) {
      writer.uint32(64).uint64(message.recurringTimeFrameAmount);
    }
    if (message.merchantPayoutAddress !== "") {
      writer.uint32(74).string(message.merchantPayoutAddress);
    }
    if (message.paymentLeniency !== 0) {
      writer.uint32(80).uint32(message.paymentLeniency);
    }
    if (message.paymentMode !== "") {
      writer.uint32(90).string(message.paymentMode);
    }
    if (message.paymentType !== "") {
      writer.uint32(98).string(message.paymentType);
    }
    if (message.safetyPeriod !== 0) {
      writer.uint32(104).uint32(message.safetyPeriod);
    }
    if (message.id !== 0) {
      writer.uint32(112).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.subscriptionType = reader.string();
          break;
        case 3:
          message.acceptedPaymentType = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.priceAmount = reader.string();
          break;
        case 6:
          message.priceCurrency = reader.string();
          break;
        case 7:
          message.recurringTimeFrame = reader.string();
          break;
        case 8:
          message.recurringTimeFrameAmount = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.merchantPayoutAddress = reader.string();
          break;
        case 10:
          message.paymentLeniency = reader.uint32();
          break;
        case 11:
          message.paymentMode = reader.string();
          break;
        case 12:
          message.paymentType = reader.string();
          break;
        case 13:
          message.safetyPeriod = reader.uint32();
          break;
        case 14:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePayment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      subscriptionType: isSet(object.subscriptionType) ? String(object.subscriptionType) : "",
      acceptedPaymentType: isSet(object.acceptedPaymentType) ? String(object.acceptedPaymentType) : "",
      name: isSet(object.name) ? String(object.name) : "",
      priceAmount: isSet(object.priceAmount) ? String(object.priceAmount) : "",
      priceCurrency: isSet(object.priceCurrency) ? String(object.priceCurrency) : "",
      recurringTimeFrame: isSet(object.recurringTimeFrame) ? String(object.recurringTimeFrame) : "",
      recurringTimeFrameAmount: isSet(object.recurringTimeFrameAmount) ? Number(object.recurringTimeFrameAmount) : 0,
      merchantPayoutAddress: isSet(object.merchantPayoutAddress) ? String(object.merchantPayoutAddress) : "",
      paymentLeniency: isSet(object.paymentLeniency) ? Number(object.paymentLeniency) : 0,
      paymentMode: isSet(object.paymentMode) ? String(object.paymentMode) : "",
      paymentType: isSet(object.paymentType) ? String(object.paymentType) : "",
      safetyPeriod: isSet(object.safetyPeriod) ? Number(object.safetyPeriod) : 0,
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgCreatePayment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.subscriptionType !== undefined && (obj.subscriptionType = message.subscriptionType);
    message.acceptedPaymentType !== undefined && (obj.acceptedPaymentType = message.acceptedPaymentType);
    message.name !== undefined && (obj.name = message.name);
    message.priceAmount !== undefined && (obj.priceAmount = message.priceAmount);
    message.priceCurrency !== undefined && (obj.priceCurrency = message.priceCurrency);
    message.recurringTimeFrame !== undefined && (obj.recurringTimeFrame = message.recurringTimeFrame);
    message.recurringTimeFrameAmount !== undefined
      && (obj.recurringTimeFrameAmount = Math.round(message.recurringTimeFrameAmount));
    message.merchantPayoutAddress !== undefined && (obj.merchantPayoutAddress = message.merchantPayoutAddress);
    message.paymentLeniency !== undefined && (obj.paymentLeniency = Math.round(message.paymentLeniency));
    message.paymentMode !== undefined && (obj.paymentMode = message.paymentMode);
    message.paymentType !== undefined && (obj.paymentType = message.paymentType);
    message.safetyPeriod !== undefined && (obj.safetyPeriod = Math.round(message.safetyPeriod));
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePayment>, I>>(object: I): MsgCreatePayment {
    const message = createBaseMsgCreatePayment();
    message.creator = object.creator ?? "";
    message.subscriptionType = object.subscriptionType ?? "";
    message.acceptedPaymentType = object.acceptedPaymentType ?? "";
    message.name = object.name ?? "";
    message.priceAmount = object.priceAmount ?? "";
    message.priceCurrency = object.priceCurrency ?? "";
    message.recurringTimeFrame = object.recurringTimeFrame ?? "";
    message.recurringTimeFrameAmount = object.recurringTimeFrameAmount ?? 0;
    message.merchantPayoutAddress = object.merchantPayoutAddress ?? "";
    message.paymentLeniency = object.paymentLeniency ?? 0;
    message.paymentMode = object.paymentMode ?? "";
    message.paymentType = object.paymentType ?? "";
    message.safetyPeriod = object.safetyPeriod ?? 0;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCreatePaymentResponse(): MsgCreatePaymentResponse {
  return { id: 0 };
}

export const MsgCreatePaymentResponse = {
  encode(message: MsgCreatePaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePaymentResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreatePaymentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePaymentResponse>, I>>(object: I): MsgCreatePaymentResponse {
    const message = createBaseMsgCreatePaymentResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCreateContract(): MsgCreateContract {
  return {
    id: 0,
    creator: "",
    paymentID: 0,
    clientWalletAddress: "",
    payWithCurrency: "",
    paymentLeniencyCounter: 0,
    totalAmount: "",
    totalAmountCurrency: "",
  };
}

export const MsgCreateContract = {
  encode(message: MsgCreateContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.paymentID !== 0) {
      writer.uint32(24).uint64(message.paymentID);
    }
    if (message.clientWalletAddress !== "") {
      writer.uint32(34).string(message.clientWalletAddress);
    }
    if (message.payWithCurrency !== "") {
      writer.uint32(42).string(message.payWithCurrency);
    }
    if (message.paymentLeniencyCounter !== 0) {
      writer.uint32(48).uint32(message.paymentLeniencyCounter);
    }
    if (message.totalAmount !== "") {
      writer.uint32(58).string(message.totalAmount);
    }
    if (message.totalAmountCurrency !== "") {
      writer.uint32(66).string(message.totalAmountCurrency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.paymentID = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.clientWalletAddress = reader.string();
          break;
        case 5:
          message.payWithCurrency = reader.string();
          break;
        case 6:
          message.paymentLeniencyCounter = reader.uint32();
          break;
        case 7:
          message.totalAmount = reader.string();
          break;
        case 8:
          message.totalAmountCurrency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateContract {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      paymentID: isSet(object.paymentID) ? Number(object.paymentID) : 0,
      clientWalletAddress: isSet(object.clientWalletAddress) ? String(object.clientWalletAddress) : "",
      payWithCurrency: isSet(object.payWithCurrency) ? String(object.payWithCurrency) : "",
      paymentLeniencyCounter: isSet(object.paymentLeniencyCounter) ? Number(object.paymentLeniencyCounter) : 0,
      totalAmount: isSet(object.totalAmount) ? String(object.totalAmount) : "",
      totalAmountCurrency: isSet(object.totalAmountCurrency) ? String(object.totalAmountCurrency) : "",
    };
  },

  toJSON(message: MsgCreateContract): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.paymentID !== undefined && (obj.paymentID = Math.round(message.paymentID));
    message.clientWalletAddress !== undefined && (obj.clientWalletAddress = message.clientWalletAddress);
    message.payWithCurrency !== undefined && (obj.payWithCurrency = message.payWithCurrency);
    message.paymentLeniencyCounter !== undefined
      && (obj.paymentLeniencyCounter = Math.round(message.paymentLeniencyCounter));
    message.totalAmount !== undefined && (obj.totalAmount = message.totalAmount);
    message.totalAmountCurrency !== undefined && (obj.totalAmountCurrency = message.totalAmountCurrency);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateContract>, I>>(object: I): MsgCreateContract {
    const message = createBaseMsgCreateContract();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.paymentID = object.paymentID ?? 0;
    message.clientWalletAddress = object.clientWalletAddress ?? "";
    message.payWithCurrency = object.payWithCurrency ?? "";
    message.paymentLeniencyCounter = object.paymentLeniencyCounter ?? 0;
    message.totalAmount = object.totalAmount ?? "";
    message.totalAmountCurrency = object.totalAmountCurrency ?? "";
    return message;
  },
};

function createBaseMsgCreateContractResponse(): MsgCreateContractResponse {
  return { id: 0 };
}

export const MsgCreateContractResponse = {
  encode(message: MsgCreateContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateContractResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateContractResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateContractResponse>, I>>(object: I): MsgCreateContractResponse {
    const message = createBaseMsgCreateContractResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCreateSubscriptionPayment(): MsgCreateSubscriptionPayment {
  return { creator: "", contractID: 0, nextPaymentAt: undefined, id: 0 };
}

export const MsgCreateSubscriptionPayment = {
  encode(message: MsgCreateSubscriptionPayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.contractID !== 0) {
      writer.uint32(16).uint64(message.contractID);
    }
    if (message.nextPaymentAt !== undefined) {
      Timestamp.encode(toTimestamp(message.nextPaymentAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.id !== 0) {
      writer.uint32(32).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSubscriptionPayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSubscriptionPayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.contractID = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.nextPaymentAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSubscriptionPayment {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      contractID: isSet(object.contractID) ? Number(object.contractID) : 0,
      nextPaymentAt: isSet(object.nextPaymentAt) ? fromJsonTimestamp(object.nextPaymentAt) : undefined,
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgCreateSubscriptionPayment): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.contractID !== undefined && (obj.contractID = Math.round(message.contractID));
    message.nextPaymentAt !== undefined && (obj.nextPaymentAt = message.nextPaymentAt.toISOString());
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSubscriptionPayment>, I>>(object: I): MsgCreateSubscriptionPayment {
    const message = createBaseMsgCreateSubscriptionPayment();
    message.creator = object.creator ?? "";
    message.contractID = object.contractID ?? 0;
    message.nextPaymentAt = object.nextPaymentAt ?? undefined;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCreateSubscriptionPaymentResponse(): MsgCreateSubscriptionPaymentResponse {
  return { id: 0 };
}

export const MsgCreateSubscriptionPaymentResponse = {
  encode(message: MsgCreateSubscriptionPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSubscriptionPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSubscriptionPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSubscriptionPaymentResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateSubscriptionPaymentResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSubscriptionPaymentResponse>, I>>(
    object: I,
  ): MsgCreateSubscriptionPaymentResponse {
    const message = createBaseMsgCreateSubscriptionPaymentResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgDeleteContract(): MsgDeleteContract {
  return { creator: "", id: 0 };
}

export const MsgDeleteContract = {
  encode(message: MsgDeleteContract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteContract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteContract {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeleteContract): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteContract>, I>>(object: I): MsgDeleteContract {
    const message = createBaseMsgDeleteContract();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgDeleteContractResponse(): MsgDeleteContractResponse {
  return { id: 0 };
}

export const MsgDeleteContractResponse = {
  encode(message: MsgDeleteContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteContractResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgDeleteContractResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteContractResponse>, I>>(object: I): MsgDeleteContractResponse {
    const message = createBaseMsgDeleteContractResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCreateDispute(): MsgCreateDispute {
  return { id: 0, creator: "", contractID: 0, merchant: "", amount: "" };
}

export const MsgCreateDispute = {
  encode(message: MsgCreateDispute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.contractID !== 0) {
      writer.uint32(24).uint64(message.contractID);
    }
    if (message.merchant !== "") {
      writer.uint32(34).string(message.merchant);
    }
    if (message.amount !== "") {
      writer.uint32(42).string(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDispute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDispute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.contractID = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.merchant = reader.string();
          break;
        case 5:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDispute {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      contractID: isSet(object.contractID) ? Number(object.contractID) : 0,
      merchant: isSet(object.merchant) ? String(object.merchant) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: MsgCreateDispute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.contractID !== undefined && (obj.contractID = Math.round(message.contractID));
    message.merchant !== undefined && (obj.merchant = message.merchant);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDispute>, I>>(object: I): MsgCreateDispute {
    const message = createBaseMsgCreateDispute();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.contractID = object.contractID ?? 0;
    message.merchant = object.merchant ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseMsgCreateDisputeResponse(): MsgCreateDisputeResponse {
  return { id: 0 };
}

export const MsgCreateDisputeResponse = {
  encode(message: MsgCreateDisputeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDisputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDisputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDisputeResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgCreateDisputeResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDisputeResponse>, I>>(object: I): MsgCreateDisputeResponse {
    const message = createBaseMsgCreateDisputeResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgUpdateDispute(): MsgUpdateDispute {
  return { creator: "", id: 0, verdict: "" };
}

export const MsgUpdateDispute = {
  encode(message: MsgUpdateDispute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.verdict !== "") {
      writer.uint32(26).string(message.verdict);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDispute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDispute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.verdict = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDispute {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      verdict: isSet(object.verdict) ? String(object.verdict) : "",
    };
  },

  toJSON(message: MsgUpdateDispute): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.verdict !== undefined && (obj.verdict = message.verdict);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDispute>, I>>(object: I): MsgUpdateDispute {
    const message = createBaseMsgUpdateDispute();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    message.verdict = object.verdict ?? "";
    return message;
  },
};

function createBaseMsgUpdateDisputeResponse(): MsgUpdateDisputeResponse {
  return { id: 0 };
}

export const MsgUpdateDisputeResponse = {
  encode(message: MsgUpdateDisputeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDisputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDisputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDisputeResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgUpdateDisputeResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDisputeResponse>, I>>(object: I): MsgUpdateDisputeResponse {
    const message = createBaseMsgUpdateDisputeResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCancelDispute(): MsgCancelDispute {
  return { creator: "", id: 0 };
}

export const MsgCancelDispute = {
  encode(message: MsgCancelDispute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelDispute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelDispute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelDispute {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgCancelDispute): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelDispute>, I>>(object: I): MsgCancelDispute {
    const message = createBaseMsgCancelDispute();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgCancelDisputeResponse(): MsgCancelDisputeResponse {
  return {};
}

export const MsgCancelDisputeResponse = {
  encode(_: MsgCancelDisputeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelDisputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelDisputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCancelDisputeResponse {
    return {};
  },

  toJSON(_: MsgCancelDisputeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelDisputeResponse>, I>>(_: I): MsgCancelDisputeResponse {
    const message = createBaseMsgCancelDisputeResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreatePayment(request: MsgCreatePayment): Promise<MsgCreatePaymentResponse>;
  CreateContract(request: MsgCreateContract): Promise<MsgCreateContractResponse>;
  CreateSubscriptionPayment(request: MsgCreateSubscriptionPayment): Promise<MsgCreateSubscriptionPaymentResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteContract(request: MsgDeleteContract): Promise<MsgDeleteContractResponse>;
  CreateDispute(request: MsgCreateDispute): Promise<MsgCreateDisputeResponse>;
  UpdateDispute(request: MsgUpdateDispute): Promise<MsgUpdateDisputeResponse>;
  CancelDispute(request: MsgCancelDispute): Promise<MsgCancelDisputeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePayment = this.CreatePayment.bind(this);
    this.CreateContract = this.CreateContract.bind(this);
    this.CreateSubscriptionPayment = this.CreateSubscriptionPayment.bind(this);
    this.DeleteContract = this.DeleteContract.bind(this);
    this.CreateDispute = this.CreateDispute.bind(this);
    this.UpdateDispute = this.UpdateDispute.bind(this);
    this.CancelDispute = this.CancelDispute.bind(this);
  }
  CreatePayment(request: MsgCreatePayment): Promise<MsgCreatePaymentResponse> {
    const data = MsgCreatePayment.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "CreatePayment", data);
    return promise.then((data) => MsgCreatePaymentResponse.decode(new _m0.Reader(data)));
  }

  CreateContract(request: MsgCreateContract): Promise<MsgCreateContractResponse> {
    const data = MsgCreateContract.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "CreateContract", data);
    return promise.then((data) => MsgCreateContractResponse.decode(new _m0.Reader(data)));
  }

  CreateSubscriptionPayment(request: MsgCreateSubscriptionPayment): Promise<MsgCreateSubscriptionPaymentResponse> {
    const data = MsgCreateSubscriptionPayment.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "CreateSubscriptionPayment", data);
    return promise.then((data) => MsgCreateSubscriptionPaymentResponse.decode(new _m0.Reader(data)));
  }

  DeleteContract(request: MsgDeleteContract): Promise<MsgDeleteContractResponse> {
    const data = MsgDeleteContract.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "DeleteContract", data);
    return promise.then((data) => MsgDeleteContractResponse.decode(new _m0.Reader(data)));
  }

  CreateDispute(request: MsgCreateDispute): Promise<MsgCreateDisputeResponse> {
    const data = MsgCreateDispute.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "CreateDispute", data);
    return promise.then((data) => MsgCreateDisputeResponse.decode(new _m0.Reader(data)));
  }

  UpdateDispute(request: MsgUpdateDispute): Promise<MsgUpdateDisputeResponse> {
    const data = MsgUpdateDispute.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "UpdateDispute", data);
    return promise.then((data) => MsgUpdateDisputeResponse.decode(new _m0.Reader(data)));
  }

  CancelDispute(request: MsgCancelDispute): Promise<MsgCancelDisputeResponse> {
    const data = MsgCancelDispute.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Msg", "CancelDispute", data);
    return promise.then((data) => MsgCancelDisputeResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}