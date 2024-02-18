/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "subscription.subscription";

export interface Subscription {
  id: number;
  creator: string;
  subscriptionType: string;
  acceptedPaymentType: string;
  subscriptionName: string;
  subscriptionPriceAmount: string;
  subscriptionPriceCurrency: string;
  recurringTimeFrame: string;
  recurringTimeFrameAmount: number;
  merchantPayoutAddress: string;
  paymentLeniency: number;
  counts: number;
  paymentMode: string;
  paymentType: string;
  safetyPeriod: number;
  createdAt: Date | undefined;
}

function createBaseSubscription(): Subscription {
  return {
    id: 0,
    creator: "",
    subscriptionType: "",
    acceptedPaymentType: "",
    subscriptionName: "",
    subscriptionPriceAmount: "",
    subscriptionPriceCurrency: "",
    recurringTimeFrame: "",
    recurringTimeFrameAmount: 0,
    merchantPayoutAddress: "",
    paymentLeniency: 0,
    counts: 0,
    paymentMode: "",
    paymentType: "",
    safetyPeriod: 0,
    createdAt: undefined,
  };
}

export const Subscription = {
  encode(message: Subscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.subscriptionType !== "") {
      writer.uint32(26).string(message.subscriptionType);
    }
    if (message.acceptedPaymentType !== "") {
      writer.uint32(34).string(message.acceptedPaymentType);
    }
    if (message.subscriptionName !== "") {
      writer.uint32(42).string(message.subscriptionName);
    }
    if (message.subscriptionPriceAmount !== "") {
      writer.uint32(50).string(message.subscriptionPriceAmount);
    }
    if (message.subscriptionPriceCurrency !== "") {
      writer.uint32(58).string(message.subscriptionPriceCurrency);
    }
    if (message.recurringTimeFrame !== "") {
      writer.uint32(66).string(message.recurringTimeFrame);
    }
    if (message.recurringTimeFrameAmount !== 0) {
      writer.uint32(72).uint64(message.recurringTimeFrameAmount);
    }
    if (message.merchantPayoutAddress !== "") {
      writer.uint32(82).string(message.merchantPayoutAddress);
    }
    if (message.paymentLeniency !== 0) {
      writer.uint32(88).uint32(message.paymentLeniency);
    }
    if (message.counts !== 0) {
      writer.uint32(96).uint32(message.counts);
    }
    if (message.paymentMode !== "") {
      writer.uint32(106).string(message.paymentMode);
    }
    if (message.paymentType !== "") {
      writer.uint32(114).string(message.paymentType);
    }
    if (message.safetyPeriod !== 0) {
      writer.uint32(120).uint32(message.safetyPeriod);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Subscription {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscription();
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
          message.subscriptionType = reader.string();
          break;
        case 4:
          message.acceptedPaymentType = reader.string();
          break;
        case 5:
          message.subscriptionName = reader.string();
          break;
        case 6:
          message.subscriptionPriceAmount = reader.string();
          break;
        case 7:
          message.subscriptionPriceCurrency = reader.string();
          break;
        case 8:
          message.recurringTimeFrame = reader.string();
          break;
        case 9:
          message.recurringTimeFrameAmount = longToNumber(reader.uint64() as Long);
          break;
        case 10:
          message.merchantPayoutAddress = reader.string();
          break;
        case 11:
          message.paymentLeniency = reader.uint32();
          break;
        case 12:
          message.counts = reader.uint32();
          break;
        case 13:
          message.paymentMode = reader.string();
          break;
        case 14:
          message.paymentType = reader.string();
          break;
        case 15:
          message.safetyPeriod = reader.uint32();
          break;
        case 16:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Subscription {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      subscriptionType: isSet(object.subscriptionType) ? String(object.subscriptionType) : "",
      acceptedPaymentType: isSet(object.acceptedPaymentType) ? String(object.acceptedPaymentType) : "",
      subscriptionName: isSet(object.subscriptionName) ? String(object.subscriptionName) : "",
      subscriptionPriceAmount: isSet(object.subscriptionPriceAmount) ? String(object.subscriptionPriceAmount) : "",
      subscriptionPriceCurrency: isSet(object.subscriptionPriceCurrency)
        ? String(object.subscriptionPriceCurrency)
        : "",
      recurringTimeFrame: isSet(object.recurringTimeFrame) ? String(object.recurringTimeFrame) : "",
      recurringTimeFrameAmount: isSet(object.recurringTimeFrameAmount) ? Number(object.recurringTimeFrameAmount) : 0,
      merchantPayoutAddress: isSet(object.merchantPayoutAddress) ? String(object.merchantPayoutAddress) : "",
      paymentLeniency: isSet(object.paymentLeniency) ? Number(object.paymentLeniency) : 0,
      counts: isSet(object.counts) ? Number(object.counts) : 0,
      paymentMode: isSet(object.paymentMode) ? String(object.paymentMode) : "",
      paymentType: isSet(object.paymentType) ? String(object.paymentType) : "",
      safetyPeriod: isSet(object.safetyPeriod) ? Number(object.safetyPeriod) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: Subscription): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.subscriptionType !== undefined && (obj.subscriptionType = message.subscriptionType);
    message.acceptedPaymentType !== undefined && (obj.acceptedPaymentType = message.acceptedPaymentType);
    message.subscriptionName !== undefined && (obj.subscriptionName = message.subscriptionName);
    message.subscriptionPriceAmount !== undefined && (obj.subscriptionPriceAmount = message.subscriptionPriceAmount);
    message.subscriptionPriceCurrency !== undefined
      && (obj.subscriptionPriceCurrency = message.subscriptionPriceCurrency);
    message.recurringTimeFrame !== undefined && (obj.recurringTimeFrame = message.recurringTimeFrame);
    message.recurringTimeFrameAmount !== undefined
      && (obj.recurringTimeFrameAmount = Math.round(message.recurringTimeFrameAmount));
    message.merchantPayoutAddress !== undefined && (obj.merchantPayoutAddress = message.merchantPayoutAddress);
    message.paymentLeniency !== undefined && (obj.paymentLeniency = Math.round(message.paymentLeniency));
    message.counts !== undefined && (obj.counts = Math.round(message.counts));
    message.paymentMode !== undefined && (obj.paymentMode = message.paymentMode);
    message.paymentType !== undefined && (obj.paymentType = message.paymentType);
    message.safetyPeriod !== undefined && (obj.safetyPeriod = Math.round(message.safetyPeriod));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Subscription>, I>>(object: I): Subscription {
    const message = createBaseSubscription();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.subscriptionType = object.subscriptionType ?? "";
    message.acceptedPaymentType = object.acceptedPaymentType ?? "";
    message.subscriptionName = object.subscriptionName ?? "";
    message.subscriptionPriceAmount = object.subscriptionPriceAmount ?? "";
    message.subscriptionPriceCurrency = object.subscriptionPriceCurrency ?? "";
    message.recurringTimeFrame = object.recurringTimeFrame ?? "";
    message.recurringTimeFrameAmount = object.recurringTimeFrameAmount ?? 0;
    message.merchantPayoutAddress = object.merchantPayoutAddress ?? "";
    message.paymentLeniency = object.paymentLeniency ?? 0;
    message.counts = object.counts ?? 0;
    message.paymentMode = object.paymentMode ?? "";
    message.paymentType = object.paymentType ?? "";
    message.safetyPeriod = object.safetyPeriod ?? 0;
    message.createdAt = object.createdAt ?? undefined;
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