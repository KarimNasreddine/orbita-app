/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Contract } from "./contract";
import { Dispute } from "./dispute";
import { Params } from "./params";
import { Payment } from "./payment";
import { SubscriptionPayment } from "./subscription_payment";

export const protobufPackage = "orbita.pay";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetPaymentRequest {
  id: number;
}

export interface QueryGetPaymentResponse {
  Payment: Payment | undefined;
}

export interface QueryAllPaymentRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllPaymentResponse {
  Payment: Payment[];
  pagination: PageResponse | undefined;
}

export interface QueryPaymentsRequest {
  merchantAddress: string;
  /** Add pagination to request */
  pagination: PageRequest | undefined;
}

export interface QueryPaymentsResponse {
  Payment: Payment[];
  /** Add pagination to response */
  pagination: PageResponse | undefined;
}

export interface QueryGetContractRequest {
  id: number;
}

export interface QueryGetContractResponse {
  Contract: Contract | undefined;
}

export interface QueryAllContractRequest {
  address: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllContractResponse {
  /** repeated Contract Contract = 1 [(gogoproto.nullable) = false]; */
  Contracts: Payment[];
  pagination: PageResponse | undefined;
}

export interface QueryContractsRequest {
  id: string;
  /** "payment" or "address". */
  querytype: string;
  pagination: PageRequest | undefined;
}

export interface QueryContractsResponse {
  /** Subscription Subscription = 1; */
  Contracts: Payment[];
  /** Return a list of contracts */
  Contract: Contract[];
  pagination: PageResponse | undefined;
}

export interface QueryGetSubscriptionPaymentRequest {
  id: number;
}

export interface QueryGetSubscriptionPaymentResponse {
  SubscriptionPayment: SubscriptionPayment | undefined;
}

export interface QueryAllSubscriptionPaymentRequest {
  /** Query by contractID. */
  id: number;
  /** "contract" or "all". */
  querytype: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllSubscriptionPaymentResponse {
  SubscriptionPayment: SubscriptionPayment[];
  pagination: PageResponse | undefined;
}

/** this line is used by starport scaffolding # 3 */
export interface QueryGetDisputeRequest {
  id: number;
}

export interface QueryGetDisputeResponse {
  Dispute: Dispute | undefined;
}

export interface QueryAllDisputeRequest {
  address: string;
  pagination: PageRequest | undefined;
}

export interface QueryAllDisputeResponse {
  Dispute: Dispute[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetPaymentRequest(): QueryGetPaymentRequest {
  return { id: 0 };
}

export const QueryGetPaymentRequest = {
  encode(message: QueryGetPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPaymentRequest();
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

  fromJSON(object: any): QueryGetPaymentRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetPaymentRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPaymentRequest>, I>>(object: I): QueryGetPaymentRequest {
    const message = createBaseQueryGetPaymentRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetPaymentResponse(): QueryGetPaymentResponse {
  return { Payment: undefined };
}

export const QueryGetPaymentResponse = {
  encode(message: QueryGetPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Payment !== undefined) {
      Payment.encode(message.Payment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Payment = Payment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetPaymentResponse {
    return { Payment: isSet(object.Payment) ? Payment.fromJSON(object.Payment) : undefined };
  },

  toJSON(message: QueryGetPaymentResponse): unknown {
    const obj: any = {};
    message.Payment !== undefined && (obj.Payment = message.Payment ? Payment.toJSON(message.Payment) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetPaymentResponse>, I>>(object: I): QueryGetPaymentResponse {
    const message = createBaseQueryGetPaymentResponse();
    message.Payment = (object.Payment !== undefined && object.Payment !== null)
      ? Payment.fromPartial(object.Payment)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPaymentRequest(): QueryAllPaymentRequest {
  return { pagination: undefined };
}

export const QueryAllPaymentRequest = {
  encode(message: QueryAllPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPaymentRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllPaymentRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPaymentRequest>, I>>(object: I): QueryAllPaymentRequest {
    const message = createBaseQueryAllPaymentRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllPaymentResponse(): QueryAllPaymentResponse {
  return { Payment: [], pagination: undefined };
}

export const QueryAllPaymentResponse = {
  encode(message: QueryAllPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Payment) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Payment.push(Payment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllPaymentResponse {
    return {
      Payment: Array.isArray(object?.Payment) ? object.Payment.map((e: any) => Payment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllPaymentResponse): unknown {
    const obj: any = {};
    if (message.Payment) {
      obj.Payment = message.Payment.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.Payment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllPaymentResponse>, I>>(object: I): QueryAllPaymentResponse {
    const message = createBaseQueryAllPaymentResponse();
    message.Payment = object.Payment?.map((e) => Payment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPaymentsRequest(): QueryPaymentsRequest {
  return { merchantAddress: "", pagination: undefined };
}

export const QueryPaymentsRequest = {
  encode(message: QueryPaymentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.merchantAddress !== "") {
      writer.uint32(10).string(message.merchantAddress);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPaymentsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPaymentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.merchantAddress = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPaymentsRequest {
    return {
      merchantAddress: isSet(object.merchantAddress) ? String(object.merchantAddress) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPaymentsRequest): unknown {
    const obj: any = {};
    message.merchantAddress !== undefined && (obj.merchantAddress = message.merchantAddress);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPaymentsRequest>, I>>(object: I): QueryPaymentsRequest {
    const message = createBaseQueryPaymentsRequest();
    message.merchantAddress = object.merchantAddress ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryPaymentsResponse(): QueryPaymentsResponse {
  return { Payment: [], pagination: undefined };
}

export const QueryPaymentsResponse = {
  encode(message: QueryPaymentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Payment) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPaymentsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPaymentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Payment.push(Payment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPaymentsResponse {
    return {
      Payment: Array.isArray(object?.Payment) ? object.Payment.map((e: any) => Payment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryPaymentsResponse): unknown {
    const obj: any = {};
    if (message.Payment) {
      obj.Payment = message.Payment.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.Payment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPaymentsResponse>, I>>(object: I): QueryPaymentsResponse {
    const message = createBaseQueryPaymentsResponse();
    message.Payment = object.Payment?.map((e) => Payment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetContractRequest(): QueryGetContractRequest {
  return { id: 0 };
}

export const QueryGetContractRequest = {
  encode(message: QueryGetContractRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetContractRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetContractRequest();
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

  fromJSON(object: any): QueryGetContractRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetContractRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetContractRequest>, I>>(object: I): QueryGetContractRequest {
    const message = createBaseQueryGetContractRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetContractResponse(): QueryGetContractResponse {
  return { Contract: undefined };
}

export const QueryGetContractResponse = {
  encode(message: QueryGetContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Contract !== undefined) {
      Contract.encode(message.Contract, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Contract = Contract.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetContractResponse {
    return { Contract: isSet(object.Contract) ? Contract.fromJSON(object.Contract) : undefined };
  },

  toJSON(message: QueryGetContractResponse): unknown {
    const obj: any = {};
    message.Contract !== undefined && (obj.Contract = message.Contract ? Contract.toJSON(message.Contract) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetContractResponse>, I>>(object: I): QueryGetContractResponse {
    const message = createBaseQueryGetContractResponse();
    message.Contract = (object.Contract !== undefined && object.Contract !== null)
      ? Contract.fromPartial(object.Contract)
      : undefined;
    return message;
  },
};

function createBaseQueryAllContractRequest(): QueryAllContractRequest {
  return { address: "", pagination: undefined };
}

export const QueryAllContractRequest = {
  encode(message: QueryAllContractRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllContractRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllContractRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllContractRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllContractRequest>, I>>(object: I): QueryAllContractRequest {
    const message = createBaseQueryAllContractRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllContractResponse(): QueryAllContractResponse {
  return { Contracts: [], pagination: undefined };
}

export const QueryAllContractResponse = {
  encode(message: QueryAllContractResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Contracts) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllContractResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Contracts.push(Payment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllContractResponse {
    return {
      Contracts: Array.isArray(object?.Contracts) ? object.Contracts.map((e: any) => Payment.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllContractResponse): unknown {
    const obj: any = {};
    if (message.Contracts) {
      obj.Contracts = message.Contracts.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.Contracts = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllContractResponse>, I>>(object: I): QueryAllContractResponse {
    const message = createBaseQueryAllContractResponse();
    message.Contracts = object.Contracts?.map((e) => Payment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryContractsRequest(): QueryContractsRequest {
  return { id: "", querytype: "", pagination: undefined };
}

export const QueryContractsRequest = {
  encode(message: QueryContractsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.querytype !== "") {
      writer.uint32(18).string(message.querytype);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.querytype = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      querytype: isSet(object.querytype) ? String(object.querytype) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryContractsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.querytype !== undefined && (obj.querytype = message.querytype);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractsRequest>, I>>(object: I): QueryContractsRequest {
    const message = createBaseQueryContractsRequest();
    message.id = object.id ?? "";
    message.querytype = object.querytype ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryContractsResponse(): QueryContractsResponse {
  return { Contracts: [], Contract: [], pagination: undefined };
}

export const QueryContractsResponse = {
  encode(message: QueryContractsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Contracts) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.Contract) {
      Contract.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryContractsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Contracts.push(Payment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.Contract.push(Contract.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryContractsResponse {
    return {
      Contracts: Array.isArray(object?.Contracts) ? object.Contracts.map((e: any) => Payment.fromJSON(e)) : [],
      Contract: Array.isArray(object?.Contract) ? object.Contract.map((e: any) => Contract.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryContractsResponse): unknown {
    const obj: any = {};
    if (message.Contracts) {
      obj.Contracts = message.Contracts.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.Contracts = [];
    }
    if (message.Contract) {
      obj.Contract = message.Contract.map((e) => e ? Contract.toJSON(e) : undefined);
    } else {
      obj.Contract = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryContractsResponse>, I>>(object: I): QueryContractsResponse {
    const message = createBaseQueryContractsResponse();
    message.Contracts = object.Contracts?.map((e) => Payment.fromPartial(e)) || [];
    message.Contract = object.Contract?.map((e) => Contract.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetSubscriptionPaymentRequest(): QueryGetSubscriptionPaymentRequest {
  return { id: 0 };
}

export const QueryGetSubscriptionPaymentRequest = {
  encode(message: QueryGetSubscriptionPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSubscriptionPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSubscriptionPaymentRequest();
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

  fromJSON(object: any): QueryGetSubscriptionPaymentRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetSubscriptionPaymentRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSubscriptionPaymentRequest>, I>>(
    object: I,
  ): QueryGetSubscriptionPaymentRequest {
    const message = createBaseQueryGetSubscriptionPaymentRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetSubscriptionPaymentResponse(): QueryGetSubscriptionPaymentResponse {
  return { SubscriptionPayment: undefined };
}

export const QueryGetSubscriptionPaymentResponse = {
  encode(message: QueryGetSubscriptionPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.SubscriptionPayment !== undefined) {
      SubscriptionPayment.encode(message.SubscriptionPayment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetSubscriptionPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSubscriptionPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SubscriptionPayment = SubscriptionPayment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSubscriptionPaymentResponse {
    return {
      SubscriptionPayment: isSet(object.SubscriptionPayment)
        ? SubscriptionPayment.fromJSON(object.SubscriptionPayment)
        : undefined,
    };
  },

  toJSON(message: QueryGetSubscriptionPaymentResponse): unknown {
    const obj: any = {};
    message.SubscriptionPayment !== undefined && (obj.SubscriptionPayment = message.SubscriptionPayment
      ? SubscriptionPayment.toJSON(message.SubscriptionPayment)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSubscriptionPaymentResponse>, I>>(
    object: I,
  ): QueryGetSubscriptionPaymentResponse {
    const message = createBaseQueryGetSubscriptionPaymentResponse();
    message.SubscriptionPayment = (object.SubscriptionPayment !== undefined && object.SubscriptionPayment !== null)
      ? SubscriptionPayment.fromPartial(object.SubscriptionPayment)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSubscriptionPaymentRequest(): QueryAllSubscriptionPaymentRequest {
  return { id: 0, querytype: "", pagination: undefined };
}

export const QueryAllSubscriptionPaymentRequest = {
  encode(message: QueryAllSubscriptionPaymentRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.querytype !== "") {
      writer.uint32(18).string(message.querytype);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSubscriptionPaymentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSubscriptionPaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.querytype = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSubscriptionPaymentRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      querytype: isSet(object.querytype) ? String(object.querytype) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSubscriptionPaymentRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.querytype !== undefined && (obj.querytype = message.querytype);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSubscriptionPaymentRequest>, I>>(
    object: I,
  ): QueryAllSubscriptionPaymentRequest {
    const message = createBaseQueryAllSubscriptionPaymentRequest();
    message.id = object.id ?? 0;
    message.querytype = object.querytype ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllSubscriptionPaymentResponse(): QueryAllSubscriptionPaymentResponse {
  return { SubscriptionPayment: [], pagination: undefined };
}

export const QueryAllSubscriptionPaymentResponse = {
  encode(message: QueryAllSubscriptionPaymentResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.SubscriptionPayment) {
      SubscriptionPayment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllSubscriptionPaymentResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSubscriptionPaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.SubscriptionPayment.push(SubscriptionPayment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSubscriptionPaymentResponse {
    return {
      SubscriptionPayment: Array.isArray(object?.SubscriptionPayment)
        ? object.SubscriptionPayment.map((e: any) => SubscriptionPayment.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllSubscriptionPaymentResponse): unknown {
    const obj: any = {};
    if (message.SubscriptionPayment) {
      obj.SubscriptionPayment = message.SubscriptionPayment.map((e) => e ? SubscriptionPayment.toJSON(e) : undefined);
    } else {
      obj.SubscriptionPayment = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSubscriptionPaymentResponse>, I>>(
    object: I,
  ): QueryAllSubscriptionPaymentResponse {
    const message = createBaseQueryAllSubscriptionPaymentResponse();
    message.SubscriptionPayment = object.SubscriptionPayment?.map((e) => SubscriptionPayment.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGetDisputeRequest(): QueryGetDisputeRequest {
  return { id: 0 };
}

export const QueryGetDisputeRequest = {
  encode(message: QueryGetDisputeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDisputeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDisputeRequest();
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

  fromJSON(object: any): QueryGetDisputeRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: QueryGetDisputeRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDisputeRequest>, I>>(object: I): QueryGetDisputeRequest {
    const message = createBaseQueryGetDisputeRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseQueryGetDisputeResponse(): QueryGetDisputeResponse {
  return { Dispute: undefined };
}

export const QueryGetDisputeResponse = {
  encode(message: QueryGetDisputeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Dispute !== undefined) {
      Dispute.encode(message.Dispute, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDisputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDisputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Dispute = Dispute.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDisputeResponse {
    return { Dispute: isSet(object.Dispute) ? Dispute.fromJSON(object.Dispute) : undefined };
  },

  toJSON(message: QueryGetDisputeResponse): unknown {
    const obj: any = {};
    message.Dispute !== undefined && (obj.Dispute = message.Dispute ? Dispute.toJSON(message.Dispute) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDisputeResponse>, I>>(object: I): QueryGetDisputeResponse {
    const message = createBaseQueryGetDisputeResponse();
    message.Dispute = (object.Dispute !== undefined && object.Dispute !== null)
      ? Dispute.fromPartial(object.Dispute)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDisputeRequest(): QueryAllDisputeRequest {
  return { address: "", pagination: undefined };
}

export const QueryAllDisputeRequest = {
  encode(message: QueryAllDisputeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDisputeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDisputeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDisputeRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDisputeRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDisputeRequest>, I>>(object: I): QueryAllDisputeRequest {
    const message = createBaseQueryAllDisputeRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllDisputeResponse(): QueryAllDisputeResponse {
  return { Dispute: [], pagination: undefined };
}

export const QueryAllDisputeResponse = {
  encode(message: QueryAllDisputeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Dispute) {
      Dispute.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllDisputeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDisputeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Dispute.push(Dispute.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDisputeResponse {
    return {
      Dispute: Array.isArray(object?.Dispute) ? object.Dispute.map((e: any) => Dispute.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllDisputeResponse): unknown {
    const obj: any = {};
    if (message.Dispute) {
      obj.Dispute = message.Dispute.map((e) => e ? Dispute.toJSON(e) : undefined);
    } else {
      obj.Dispute = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDisputeResponse>, I>>(object: I): QueryAllDisputeResponse {
    const message = createBaseQueryAllDisputeResponse();
    message.Dispute = object.Dispute?.map((e) => Dispute.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Payment by id. */
  Payment(request: QueryGetPaymentRequest): Promise<QueryGetPaymentResponse>;
  /** Queries a list of Payment items. */
  PaymentAll(request: QueryAllPaymentRequest): Promise<QueryAllPaymentResponse>;
  /** Queries a list of Payments items by merchant address */
  Payments(request: QueryPaymentsRequest): Promise<QueryPaymentsResponse>;
  /** Queries a Contract by id. */
  Contract(request: QueryGetContractRequest): Promise<QueryGetContractResponse>;
  /** Queries a list of Contract items by contract creator */
  ContractAll(request: QueryAllContractRequest): Promise<QueryAllContractResponse>;
  /** Queries a list of Contracts items by SubscriptionID or contract contract creator */
  Contracts(request: QueryContractsRequest): Promise<QueryContractsResponse>;
  /** Queries a SubscriptionPayment by id. */
  SubscriptionPayment(request: QueryGetSubscriptionPaymentRequest): Promise<QueryGetSubscriptionPaymentResponse>;
  /** Queries a list of SubscriptionPayment items. */
  SubscriptionPaymentAll(request: QueryAllSubscriptionPaymentRequest): Promise<QueryAllSubscriptionPaymentResponse>;
  /** Queries a dispute item details. */
  Dispute(request: QueryGetDisputeRequest): Promise<QueryGetDisputeResponse>;
  /** Queries a list of Dispute items by a creator or merchant */
  DisputeAll(request: QueryAllDisputeRequest): Promise<QueryAllDisputeResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Payment = this.Payment.bind(this);
    this.PaymentAll = this.PaymentAll.bind(this);
    this.Payments = this.Payments.bind(this);
    this.Contract = this.Contract.bind(this);
    this.ContractAll = this.ContractAll.bind(this);
    this.Contracts = this.Contracts.bind(this);
    this.SubscriptionPayment = this.SubscriptionPayment.bind(this);
    this.SubscriptionPaymentAll = this.SubscriptionPaymentAll.bind(this);
    this.Dispute = this.Dispute.bind(this);
    this.DisputeAll = this.DisputeAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Payment(request: QueryGetPaymentRequest): Promise<QueryGetPaymentResponse> {
    const data = QueryGetPaymentRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Payment", data);
    return promise.then((data) => QueryGetPaymentResponse.decode(new _m0.Reader(data)));
  }

  PaymentAll(request: QueryAllPaymentRequest): Promise<QueryAllPaymentResponse> {
    const data = QueryAllPaymentRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "PaymentAll", data);
    return promise.then((data) => QueryAllPaymentResponse.decode(new _m0.Reader(data)));
  }

  Payments(request: QueryPaymentsRequest): Promise<QueryPaymentsResponse> {
    const data = QueryPaymentsRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Payments", data);
    return promise.then((data) => QueryPaymentsResponse.decode(new _m0.Reader(data)));
  }

  Contract(request: QueryGetContractRequest): Promise<QueryGetContractResponse> {
    const data = QueryGetContractRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Contract", data);
    return promise.then((data) => QueryGetContractResponse.decode(new _m0.Reader(data)));
  }

  ContractAll(request: QueryAllContractRequest): Promise<QueryAllContractResponse> {
    const data = QueryAllContractRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "ContractAll", data);
    return promise.then((data) => QueryAllContractResponse.decode(new _m0.Reader(data)));
  }

  Contracts(request: QueryContractsRequest): Promise<QueryContractsResponse> {
    const data = QueryContractsRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Contracts", data);
    return promise.then((data) => QueryContractsResponse.decode(new _m0.Reader(data)));
  }

  SubscriptionPayment(request: QueryGetSubscriptionPaymentRequest): Promise<QueryGetSubscriptionPaymentResponse> {
    const data = QueryGetSubscriptionPaymentRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "SubscriptionPayment", data);
    return promise.then((data) => QueryGetSubscriptionPaymentResponse.decode(new _m0.Reader(data)));
  }

  SubscriptionPaymentAll(request: QueryAllSubscriptionPaymentRequest): Promise<QueryAllSubscriptionPaymentResponse> {
    const data = QueryAllSubscriptionPaymentRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "SubscriptionPaymentAll", data);
    return promise.then((data) => QueryAllSubscriptionPaymentResponse.decode(new _m0.Reader(data)));
  }

  Dispute(request: QueryGetDisputeRequest): Promise<QueryGetDisputeResponse> {
    const data = QueryGetDisputeRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "Dispute", data);
    return promise.then((data) => QueryGetDisputeResponse.decode(new _m0.Reader(data)));
  }

  DisputeAll(request: QueryAllDisputeRequest): Promise<QueryAllDisputeResponse> {
    const data = QueryAllDisputeRequest.encode(request).finish();
    const promise = this.rpc.request("orbita.pay.Query", "DisputeAll", data);
    return promise.then((data) => QueryAllDisputeResponse.decode(new _m0.Reader(data)));
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