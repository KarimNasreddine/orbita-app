/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "subscription.subscription";

/** EventContractActivated is emitted on MsgCreateContract */
export interface EventContractActivated {
  subscriptionId: string;
  subscriptionCreator: string;
  contractId: string;
  contractCreator: string;
}

/** EventInsufficientFunds is emitted on MsgCreatePayment */
export interface EventInsufficientFunds {
  subscriptionId: string;
  subscriptionCreator: string;
  contractId: string;
  contractCreator: string;
}

/** EventContractCancelled is emitted on MsgDeleteContract */
export interface EventContractCancelled {
  subscriptionId: string;
  subscriptionCreator: string;
  contractId: string;
  contractCreator: string;
}

/** EventContractContinued is emitted on MsgCreatePayment */
export interface EventContractContinued {
  subscriptionId: string;
  subscriptionCreator: string;
  contractId: string;
  contractCreator: string;
}

function createBaseEventContractActivated(): EventContractActivated {
  return { subscriptionId: "", subscriptionCreator: "", contractId: "", contractCreator: "" };
}

export const EventContractActivated = {
  encode(message: EventContractActivated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscriptionId !== "") {
      writer.uint32(10).string(message.subscriptionId);
    }
    if (message.subscriptionCreator !== "") {
      writer.uint32(18).string(message.subscriptionCreator);
    }
    if (message.contractId !== "") {
      writer.uint32(26).string(message.contractId);
    }
    if (message.contractCreator !== "") {
      writer.uint32(34).string(message.contractCreator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventContractActivated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventContractActivated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptionId = reader.string();
          break;
        case 2:
          message.subscriptionCreator = reader.string();
          break;
        case 3:
          message.contractId = reader.string();
          break;
        case 4:
          message.contractCreator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventContractActivated {
    return {
      subscriptionId: isSet(object.subscriptionId) ? String(object.subscriptionId) : "",
      subscriptionCreator: isSet(object.subscriptionCreator) ? String(object.subscriptionCreator) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      contractCreator: isSet(object.contractCreator) ? String(object.contractCreator) : "",
    };
  },

  toJSON(message: EventContractActivated): unknown {
    const obj: any = {};
    message.subscriptionId !== undefined && (obj.subscriptionId = message.subscriptionId);
    message.subscriptionCreator !== undefined && (obj.subscriptionCreator = message.subscriptionCreator);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.contractCreator !== undefined && (obj.contractCreator = message.contractCreator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventContractActivated>, I>>(object: I): EventContractActivated {
    const message = createBaseEventContractActivated();
    message.subscriptionId = object.subscriptionId ?? "";
    message.subscriptionCreator = object.subscriptionCreator ?? "";
    message.contractId = object.contractId ?? "";
    message.contractCreator = object.contractCreator ?? "";
    return message;
  },
};

function createBaseEventInsufficientFunds(): EventInsufficientFunds {
  return { subscriptionId: "", subscriptionCreator: "", contractId: "", contractCreator: "" };
}

export const EventInsufficientFunds = {
  encode(message: EventInsufficientFunds, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscriptionId !== "") {
      writer.uint32(10).string(message.subscriptionId);
    }
    if (message.subscriptionCreator !== "") {
      writer.uint32(18).string(message.subscriptionCreator);
    }
    if (message.contractId !== "") {
      writer.uint32(26).string(message.contractId);
    }
    if (message.contractCreator !== "") {
      writer.uint32(34).string(message.contractCreator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventInsufficientFunds {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventInsufficientFunds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptionId = reader.string();
          break;
        case 2:
          message.subscriptionCreator = reader.string();
          break;
        case 3:
          message.contractId = reader.string();
          break;
        case 4:
          message.contractCreator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventInsufficientFunds {
    return {
      subscriptionId: isSet(object.subscriptionId) ? String(object.subscriptionId) : "",
      subscriptionCreator: isSet(object.subscriptionCreator) ? String(object.subscriptionCreator) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      contractCreator: isSet(object.contractCreator) ? String(object.contractCreator) : "",
    };
  },

  toJSON(message: EventInsufficientFunds): unknown {
    const obj: any = {};
    message.subscriptionId !== undefined && (obj.subscriptionId = message.subscriptionId);
    message.subscriptionCreator !== undefined && (obj.subscriptionCreator = message.subscriptionCreator);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.contractCreator !== undefined && (obj.contractCreator = message.contractCreator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventInsufficientFunds>, I>>(object: I): EventInsufficientFunds {
    const message = createBaseEventInsufficientFunds();
    message.subscriptionId = object.subscriptionId ?? "";
    message.subscriptionCreator = object.subscriptionCreator ?? "";
    message.contractId = object.contractId ?? "";
    message.contractCreator = object.contractCreator ?? "";
    return message;
  },
};

function createBaseEventContractCancelled(): EventContractCancelled {
  return { subscriptionId: "", subscriptionCreator: "", contractId: "", contractCreator: "" };
}

export const EventContractCancelled = {
  encode(message: EventContractCancelled, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscriptionId !== "") {
      writer.uint32(10).string(message.subscriptionId);
    }
    if (message.subscriptionCreator !== "") {
      writer.uint32(18).string(message.subscriptionCreator);
    }
    if (message.contractId !== "") {
      writer.uint32(26).string(message.contractId);
    }
    if (message.contractCreator !== "") {
      writer.uint32(34).string(message.contractCreator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventContractCancelled {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventContractCancelled();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptionId = reader.string();
          break;
        case 2:
          message.subscriptionCreator = reader.string();
          break;
        case 3:
          message.contractId = reader.string();
          break;
        case 4:
          message.contractCreator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventContractCancelled {
    return {
      subscriptionId: isSet(object.subscriptionId) ? String(object.subscriptionId) : "",
      subscriptionCreator: isSet(object.subscriptionCreator) ? String(object.subscriptionCreator) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      contractCreator: isSet(object.contractCreator) ? String(object.contractCreator) : "",
    };
  },

  toJSON(message: EventContractCancelled): unknown {
    const obj: any = {};
    message.subscriptionId !== undefined && (obj.subscriptionId = message.subscriptionId);
    message.subscriptionCreator !== undefined && (obj.subscriptionCreator = message.subscriptionCreator);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.contractCreator !== undefined && (obj.contractCreator = message.contractCreator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventContractCancelled>, I>>(object: I): EventContractCancelled {
    const message = createBaseEventContractCancelled();
    message.subscriptionId = object.subscriptionId ?? "";
    message.subscriptionCreator = object.subscriptionCreator ?? "";
    message.contractId = object.contractId ?? "";
    message.contractCreator = object.contractCreator ?? "";
    return message;
  },
};

function createBaseEventContractContinued(): EventContractContinued {
  return { subscriptionId: "", subscriptionCreator: "", contractId: "", contractCreator: "" };
}

export const EventContractContinued = {
  encode(message: EventContractContinued, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscriptionId !== "") {
      writer.uint32(10).string(message.subscriptionId);
    }
    if (message.subscriptionCreator !== "") {
      writer.uint32(18).string(message.subscriptionCreator);
    }
    if (message.contractId !== "") {
      writer.uint32(26).string(message.contractId);
    }
    if (message.contractCreator !== "") {
      writer.uint32(34).string(message.contractCreator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventContractContinued {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventContractContinued();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscriptionId = reader.string();
          break;
        case 2:
          message.subscriptionCreator = reader.string();
          break;
        case 3:
          message.contractId = reader.string();
          break;
        case 4:
          message.contractCreator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventContractContinued {
    return {
      subscriptionId: isSet(object.subscriptionId) ? String(object.subscriptionId) : "",
      subscriptionCreator: isSet(object.subscriptionCreator) ? String(object.subscriptionCreator) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      contractCreator: isSet(object.contractCreator) ? String(object.contractCreator) : "",
    };
  },

  toJSON(message: EventContractContinued): unknown {
    const obj: any = {};
    message.subscriptionId !== undefined && (obj.subscriptionId = message.subscriptionId);
    message.subscriptionCreator !== undefined && (obj.subscriptionCreator = message.subscriptionCreator);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.contractCreator !== undefined && (obj.contractCreator = message.contractCreator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventContractContinued>, I>>(object: I): EventContractContinued {
    const message = createBaseEventContractContinued();
    message.subscriptionId = object.subscriptionId ?? "";
    message.subscriptionCreator = object.subscriptionCreator ?? "";
    message.contractId = object.contractId ?? "";
    message.contractCreator = object.contractCreator ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
