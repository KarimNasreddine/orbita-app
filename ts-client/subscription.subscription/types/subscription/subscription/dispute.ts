/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "subscription.subscription";

export interface Dispute {
  id: number;
  creator: string;
  merchant: string;
  amount: string;
  status: string;
  verdict: string;
  createdAt: Date | undefined;
  resolvedAt: Date | undefined;
  contractID: number;
}

function createBaseDispute(): Dispute {
  return {
    id: 0,
    creator: "",
    merchant: "",
    amount: "",
    status: "",
    verdict: "",
    createdAt: undefined,
    resolvedAt: undefined,
    contractID: 0,
  };
}

export const Dispute = {
  encode(message: Dispute, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.merchant !== "") {
      writer.uint32(26).string(message.merchant);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.status !== "") {
      writer.uint32(42).string(message.status);
    }
    if (message.verdict !== "") {
      writer.uint32(50).string(message.verdict);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(58).fork()).ldelim();
    }
    if (message.resolvedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.resolvedAt), writer.uint32(66).fork()).ldelim();
    }
    if (message.contractID !== 0) {
      writer.uint32(72).uint64(message.contractID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Dispute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDispute();
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
          message.merchant = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        case 5:
          message.status = reader.string();
          break;
        case 6:
          message.verdict = reader.string();
          break;
        case 7:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.resolvedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.contractID = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Dispute {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      merchant: isSet(object.merchant) ? String(object.merchant) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      status: isSet(object.status) ? String(object.status) : "",
      verdict: isSet(object.verdict) ? String(object.verdict) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      resolvedAt: isSet(object.resolvedAt) ? fromJsonTimestamp(object.resolvedAt) : undefined,
      contractID: isSet(object.contractID) ? Number(object.contractID) : 0,
    };
  },

  toJSON(message: Dispute): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.merchant !== undefined && (obj.merchant = message.merchant);
    message.amount !== undefined && (obj.amount = message.amount);
    message.status !== undefined && (obj.status = message.status);
    message.verdict !== undefined && (obj.verdict = message.verdict);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.resolvedAt !== undefined && (obj.resolvedAt = message.resolvedAt.toISOString());
    message.contractID !== undefined && (obj.contractID = Math.round(message.contractID));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Dispute>, I>>(object: I): Dispute {
    const message = createBaseDispute();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.merchant = object.merchant ?? "";
    message.amount = object.amount ?? "";
    message.status = object.status ?? "";
    message.verdict = object.verdict ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.resolvedAt = object.resolvedAt ?? undefined;
    message.contractID = object.contractID ?? 0;
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