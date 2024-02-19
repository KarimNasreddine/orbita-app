/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Contract } from "./contract";
import { Dispute } from "./dispute";
import { Params } from "./params";
import { Payment } from "./payment";
import { SubscriptionPayment } from "./subscription_payment";

export const protobufPackage = "orbita.pay";

export interface EpochInfo {
  identifier: string;
  startTime: Date | undefined;
  duration: Duration | undefined;
  currentEpoch: number;
  currentEpochStartTime: Date | undefined;
  epochCountingStarted: boolean;
  currentEpochStartHeight: number;
}

/** GenesisState defines the subscription module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  paymentList: Payment[];
  paymentCount: number;
  contractList: Contract[];
  contractCount: number;
  subscriptionPaymentList: SubscriptionPayment[];
  subscriptionPaymentCount: number;
  epochs: EpochInfo[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  disputeList: Dispute[];
  disputeCount: number;
}

function createBaseEpochInfo(): EpochInfo {
  return {
    identifier: "",
    startTime: undefined,
    duration: undefined,
    currentEpoch: 0,
    currentEpochStartTime: undefined,
    epochCountingStarted: false,
    currentEpochStartHeight: 0,
  };
}

export const EpochInfo = {
  encode(message: EpochInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.currentEpoch !== 0) {
      writer.uint32(32).int64(message.currentEpoch);
    }
    if (message.currentEpochStartTime !== undefined) {
      Timestamp.encode(toTimestamp(message.currentEpochStartTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.epochCountingStarted === true) {
      writer.uint32(48).bool(message.epochCountingStarted);
    }
    if (message.currentEpochStartHeight !== 0) {
      writer.uint32(56).int64(message.currentEpochStartHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EpochInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpochInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 2:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.currentEpoch = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.currentEpochStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.epochCountingStarted = reader.bool();
          break;
        case 7:
          message.currentEpochStartHeight = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EpochInfo {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      currentEpoch: isSet(object.currentEpoch) ? Number(object.currentEpoch) : 0,
      currentEpochStartTime: isSet(object.currentEpochStartTime)
        ? fromJsonTimestamp(object.currentEpochStartTime)
        : undefined,
      epochCountingStarted: isSet(object.epochCountingStarted) ? Boolean(object.epochCountingStarted) : false,
      currentEpochStartHeight: isSet(object.currentEpochStartHeight) ? Number(object.currentEpochStartHeight) : 0,
    };
  },

  toJSON(message: EpochInfo): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined);
    message.currentEpoch !== undefined && (obj.currentEpoch = Math.round(message.currentEpoch));
    message.currentEpochStartTime !== undefined
      && (obj.currentEpochStartTime = message.currentEpochStartTime.toISOString());
    message.epochCountingStarted !== undefined && (obj.epochCountingStarted = message.epochCountingStarted);
    message.currentEpochStartHeight !== undefined
      && (obj.currentEpochStartHeight = Math.round(message.currentEpochStartHeight));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EpochInfo>, I>>(object: I): EpochInfo {
    const message = createBaseEpochInfo();
    message.identifier = object.identifier ?? "";
    message.startTime = object.startTime ?? undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.currentEpoch = object.currentEpoch ?? 0;
    message.currentEpochStartTime = object.currentEpochStartTime ?? undefined;
    message.epochCountingStarted = object.epochCountingStarted ?? false;
    message.currentEpochStartHeight = object.currentEpochStartHeight ?? 0;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    paymentList: [],
    paymentCount: 0,
    contractList: [],
    contractCount: 0,
    subscriptionPaymentList: [],
    subscriptionPaymentCount: 0,
    epochs: [],
    disputeList: [],
    disputeCount: 0,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.paymentList) {
      Payment.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.paymentCount !== 0) {
      writer.uint32(24).uint64(message.paymentCount);
    }
    for (const v of message.contractList) {
      Contract.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.contractCount !== 0) {
      writer.uint32(40).uint64(message.contractCount);
    }
    for (const v of message.subscriptionPaymentList) {
      SubscriptionPayment.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.subscriptionPaymentCount !== 0) {
      writer.uint32(56).uint64(message.subscriptionPaymentCount);
    }
    for (const v of message.epochs) {
      EpochInfo.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.disputeList) {
      Dispute.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.disputeCount !== 0) {
      writer.uint32(80).uint64(message.disputeCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.paymentList.push(Payment.decode(reader, reader.uint32()));
          break;
        case 3:
          message.paymentCount = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.contractList.push(Contract.decode(reader, reader.uint32()));
          break;
        case 5:
          message.contractCount = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.subscriptionPaymentList.push(SubscriptionPayment.decode(reader, reader.uint32()));
          break;
        case 7:
          message.subscriptionPaymentCount = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.epochs.push(EpochInfo.decode(reader, reader.uint32()));
          break;
        case 9:
          message.disputeList.push(Dispute.decode(reader, reader.uint32()));
          break;
        case 10:
          message.disputeCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      paymentList: Array.isArray(object?.paymentList) ? object.paymentList.map((e: any) => Payment.fromJSON(e)) : [],
      paymentCount: isSet(object.paymentCount) ? Number(object.paymentCount) : 0,
      contractList: Array.isArray(object?.contractList)
        ? object.contractList.map((e: any) => Contract.fromJSON(e))
        : [],
      contractCount: isSet(object.contractCount) ? Number(object.contractCount) : 0,
      subscriptionPaymentList: Array.isArray(object?.subscriptionPaymentList)
        ? object.subscriptionPaymentList.map((e: any) => SubscriptionPayment.fromJSON(e))
        : [],
      subscriptionPaymentCount: isSet(object.subscriptionPaymentCount) ? Number(object.subscriptionPaymentCount) : 0,
      epochs: Array.isArray(object?.epochs) ? object.epochs.map((e: any) => EpochInfo.fromJSON(e)) : [],
      disputeList: Array.isArray(object?.disputeList) ? object.disputeList.map((e: any) => Dispute.fromJSON(e)) : [],
      disputeCount: isSet(object.disputeCount) ? Number(object.disputeCount) : 0,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.paymentList) {
      obj.paymentList = message.paymentList.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.paymentList = [];
    }
    message.paymentCount !== undefined && (obj.paymentCount = Math.round(message.paymentCount));
    if (message.contractList) {
      obj.contractList = message.contractList.map((e) => e ? Contract.toJSON(e) : undefined);
    } else {
      obj.contractList = [];
    }
    message.contractCount !== undefined && (obj.contractCount = Math.round(message.contractCount));
    if (message.subscriptionPaymentList) {
      obj.subscriptionPaymentList = message.subscriptionPaymentList.map((e) =>
        e ? SubscriptionPayment.toJSON(e) : undefined
      );
    } else {
      obj.subscriptionPaymentList = [];
    }
    message.subscriptionPaymentCount !== undefined
      && (obj.subscriptionPaymentCount = Math.round(message.subscriptionPaymentCount));
    if (message.epochs) {
      obj.epochs = message.epochs.map((e) => e ? EpochInfo.toJSON(e) : undefined);
    } else {
      obj.epochs = [];
    }
    if (message.disputeList) {
      obj.disputeList = message.disputeList.map((e) => e ? Dispute.toJSON(e) : undefined);
    } else {
      obj.disputeList = [];
    }
    message.disputeCount !== undefined && (obj.disputeCount = Math.round(message.disputeCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.paymentList = object.paymentList?.map((e) => Payment.fromPartial(e)) || [];
    message.paymentCount = object.paymentCount ?? 0;
    message.contractList = object.contractList?.map((e) => Contract.fromPartial(e)) || [];
    message.contractCount = object.contractCount ?? 0;
    message.subscriptionPaymentList = object.subscriptionPaymentList?.map((e) => SubscriptionPayment.fromPartial(e))
      || [];
    message.subscriptionPaymentCount = object.subscriptionPaymentCount ?? 0;
    message.epochs = object.epochs?.map((e) => EpochInfo.fromPartial(e)) || [];
    message.disputeList = object.disputeList?.map((e) => Dispute.fromPartial(e)) || [];
    message.disputeCount = object.disputeCount ?? 0;
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