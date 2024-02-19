/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "orbita.pay";

export interface Contract {
  id: number;
  creator: string;
  clientWalletAddress: string;
  status: string;
  paymentID: number;
  createdAt: Date | undefined;
  payWithCurrency: string;
  paymentLeniencyCounter: number;
  escrowCoin: string;
  hasDispute: boolean;
  totalAmount: string;
  totalAmountCurrency: string;
}

function createBaseContract(): Contract {
  return {
    id: 0,
    creator: "",
    clientWalletAddress: "",
    status: "",
    paymentID: 0,
    createdAt: undefined,
    payWithCurrency: "",
    paymentLeniencyCounter: 0,
    escrowCoin: "",
    hasDispute: false,
    totalAmount: "",
    totalAmountCurrency: "",
  };
}

export const Contract = {
  encode(message: Contract, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.clientWalletAddress !== "") {
      writer.uint32(26).string(message.clientWalletAddress);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    if (message.paymentID !== 0) {
      writer.uint32(40).uint64(message.paymentID);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(50).fork()).ldelim();
    }
    if (message.payWithCurrency !== "") {
      writer.uint32(58).string(message.payWithCurrency);
    }
    if (message.paymentLeniencyCounter !== 0) {
      writer.uint32(64).uint32(message.paymentLeniencyCounter);
    }
    if (message.escrowCoin !== "") {
      writer.uint32(74).string(message.escrowCoin);
    }
    if (message.hasDispute === true) {
      writer.uint32(80).bool(message.hasDispute);
    }
    if (message.totalAmount !== "") {
      writer.uint32(90).string(message.totalAmount);
    }
    if (message.totalAmountCurrency !== "") {
      writer.uint32(98).string(message.totalAmountCurrency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
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
          message.clientWalletAddress = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        case 5:
          message.paymentID = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.payWithCurrency = reader.string();
          break;
        case 8:
          message.paymentLeniencyCounter = reader.uint32();
          break;
        case 9:
          message.escrowCoin = reader.string();
          break;
        case 10:
          message.hasDispute = reader.bool();
          break;
        case 11:
          message.totalAmount = reader.string();
          break;
        case 12:
          message.totalAmountCurrency = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Contract {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      clientWalletAddress: isSet(object.clientWalletAddress) ? String(object.clientWalletAddress) : "",
      status: isSet(object.status) ? String(object.status) : "",
      paymentID: isSet(object.paymentID) ? Number(object.paymentID) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      payWithCurrency: isSet(object.payWithCurrency) ? String(object.payWithCurrency) : "",
      paymentLeniencyCounter: isSet(object.paymentLeniencyCounter) ? Number(object.paymentLeniencyCounter) : 0,
      escrowCoin: isSet(object.escrowCoin) ? String(object.escrowCoin) : "",
      hasDispute: isSet(object.hasDispute) ? Boolean(object.hasDispute) : false,
      totalAmount: isSet(object.totalAmount) ? String(object.totalAmount) : "",
      totalAmountCurrency: isSet(object.totalAmountCurrency) ? String(object.totalAmountCurrency) : "",
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.clientWalletAddress !== undefined && (obj.clientWalletAddress = message.clientWalletAddress);
    message.status !== undefined && (obj.status = message.status);
    message.paymentID !== undefined && (obj.paymentID = Math.round(message.paymentID));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.payWithCurrency !== undefined && (obj.payWithCurrency = message.payWithCurrency);
    message.paymentLeniencyCounter !== undefined
      && (obj.paymentLeniencyCounter = Math.round(message.paymentLeniencyCounter));
    message.escrowCoin !== undefined && (obj.escrowCoin = message.escrowCoin);
    message.hasDispute !== undefined && (obj.hasDispute = message.hasDispute);
    message.totalAmount !== undefined && (obj.totalAmount = message.totalAmount);
    message.totalAmountCurrency !== undefined && (obj.totalAmountCurrency = message.totalAmountCurrency);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
    const message = createBaseContract();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.clientWalletAddress = object.clientWalletAddress ?? "";
    message.status = object.status ?? "";
    message.paymentID = object.paymentID ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.payWithCurrency = object.payWithCurrency ?? "";
    message.paymentLeniencyCounter = object.paymentLeniencyCounter ?? 0;
    message.escrowCoin = object.escrowCoin ?? "";
    message.hasDispute = object.hasDispute ?? false;
    message.totalAmount = object.totalAmount ?? "";
    message.totalAmountCurrency = object.totalAmountCurrency ?? "";
    return message;
  },
};

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