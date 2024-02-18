/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

export type SubscriptionMsgCancelDisputeResponse = object;

export interface SubscriptionMsgCreateContractResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionMsgCreateDisputeResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionMsgCreatePaymentResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionMsgCreateSubscriptionResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionMsgDeleteContractResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionMsgUpdateDisputeResponse {
  /** @format uint64 */
  id?: string;
}

export interface SubscriptionQueryAllContractResponse {
  /** repeated Contract Contract = 1 [(gogoproto.nullable) = false]; */
  Subscription?: SubscriptionsubscriptionSubscription[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionQueryAllDisputeResponse {
  Dispute?: SubscriptionsubscriptionDispute[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionQueryAllPaymentResponse {
  Payment?: SubscriptionsubscriptionPayment[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionQueryAllSubscriptionResponse {
  Subscription?: SubscriptionsubscriptionSubscription[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionQueryContractsResponse {
  /** Subscription Subscription = 1; */
  Subscription?: SubscriptionsubscriptionSubscription[];

  /** Return a list of contracts */
  Contract?: SubscriptionsubscriptionContract[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionQueryGetContractResponse {
  Contract?: SubscriptionsubscriptionContract;
}

export interface SubscriptionQueryGetDisputeResponse {
  Dispute?: SubscriptionsubscriptionDispute;
}

export interface SubscriptionQueryGetPaymentResponse {
  Payment?: SubscriptionsubscriptionPayment;
}

export interface SubscriptionQueryGetSubscriptionResponse {
  Subscription?: SubscriptionsubscriptionSubscription;
}

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface SubscriptionQueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: SubscriptionsubscriptionParams;
}

export interface SubscriptionQuerySubscriptionsResponse {
  Subscription?: SubscriptionsubscriptionSubscription[];

  /**
   * Add pagination to response
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface SubscriptionsubscriptionContract {
  /** @format uint64 */
  id?: string;
  creator?: string;
  clientWalletAddress?: string;
  status?: string;

  /** @format uint64 */
  subscriptionID?: string;

  /** @format date-time */
  createdAt?: string;
  payWithCurrency?: string;

  /** @format int64 */
  paymentLeniencyCounter?: number;
  escrowCoin?: string;
  hasDispute?: boolean;
  totalAmount?: string;
  totalAmountCurrency?: string;
}

export interface SubscriptionsubscriptionDispute {
  /** @format uint64 */
  id?: string;
  creator?: string;
  merchant?: string;

  /** @format uint64 */
  amount?: string;
  status?: string;
  verdict?: string;

  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  resolvedAt?: string;

  /** @format uint64 */
  contractID?: string;
}

/**
 * Params defines the parameters for the module.
 */
export interface SubscriptionsubscriptionParams {
  /** subscription epoch identifier */
  epoch_identifier?: string;
}

export interface SubscriptionsubscriptionPayment {
  /** @format uint64 */
  id?: string;
  creator?: string;

  /** @format date-time */
  createdAt?: string;

  /** @format date-time */
  nextPaymentAt?: string;

  /** @format uint64 */
  contractID?: string;
}

export interface SubscriptionsubscriptionSubscription {
  /** @format uint64 */
  id?: string;
  creator?: string;
  subscriptionType?: string;
  acceptedPaymentType?: string;
  subscriptionName?: string;
  subscriptionPriceAmount?: string;
  subscriptionPriceCurrency?: string;
  recurringTimeFrame?: string;

  /** @format uint64 */
  recurringTimeFrameAmount?: string;
  merchantPayoutAddress?: string;

  /** @format int64 */
  paymentLeniency?: number;

  /** @format int64 */
  counts?: number;
  paymentMode?: string;
  paymentType?: string;

  /** @format int64 */
  safetyPeriod?: number;

  /** @format date-time */
  createdAt?: string;
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently. It will be empty if
   * there are no more results.
   * @format byte
   */
  next_key?: string;

  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title subscription/subscription/contract.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryContract
   * @summary Queries a Contract by id.
   * @request GET:/subscription/subscription/contract/{id}
   */
  queryContract = (id: string, params: RequestParams = {}) =>
    this.request<SubscriptionQueryGetContractResponse, RpcStatus>({
      path: `/subscription/subscription/contract/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContractAll
   * @summary Queries a list of Contract items by contract creator
   * @request GET:/subscription/subscription/contracts/{address}
   */
  queryContractAll = (
    address: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQueryAllContractResponse, RpcStatus>({
      path: `/subscription/subscription/contracts/${address}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryContracts
   * @summary Queries a list of Contracts items by SubscriptionID or contract contract creator
   * @request GET:/subscription/subscription/contracts/{id}/{querytype}
   */
  queryContracts = (
    id: string,
    querytype: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQueryContractsResponse, RpcStatus>({
      path: `/subscription/subscription/contracts/${id}/${querytype}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDisputeAll
   * @summary Queries a list of Dispute items by a creator or merchant
   * @request GET:/subscription/subscription/dispute
   */
  queryDisputeAll = (
    query?: {
      address?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQueryAllDisputeResponse, RpcStatus>({
      path: `/subscription/subscription/dispute`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryDispute
   * @summary Queries a dispute item details.
   * @request GET:/subscription/subscription/dispute/{id}
   */
  queryDispute = (id: string, params: RequestParams = {}) =>
    this.request<SubscriptionQueryGetDisputeResponse, RpcStatus>({
      path: `/subscription/subscription/dispute/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/subscription/subscription/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<SubscriptionQueryParamsResponse, RpcStatus>({
      path: `/subscription/subscription/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPayment
   * @summary Queries a Payment by id.
   * @request GET:/subscription/subscription/payment/{id}
   */
  queryPayment = (id: string, params: RequestParams = {}) =>
    this.request<SubscriptionQueryGetPaymentResponse, RpcStatus>({
      path: `/subscription/subscription/payment/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryPaymentAll
   * @summary Queries a list of Payment items.
   * @request GET:/subscription/subscription/payment/{id}/{querytype}
   */
  queryPaymentAll = (
    id: string,
    querytype: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQueryAllPaymentResponse, RpcStatus>({
      path: `/subscription/subscription/payment/${id}/${querytype}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySubscriptionAll
   * @summary Queries a list of Subscription items.
   * @request GET:/subscription/subscription/subscription
   */
  querySubscriptionAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQueryAllSubscriptionResponse, RpcStatus>({
      path: `/subscription/subscription/subscription`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySubscription
   * @summary Queries a Subscription by id.
   * @request GET:/subscription/subscription/subscription/{id}
   */
  querySubscription = (id: string, params: RequestParams = {}) =>
    this.request<SubscriptionQueryGetSubscriptionResponse, RpcStatus>({
      path: `/subscription/subscription/subscription/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QuerySubscriptions
   * @summary Queries a list of Subscriptions items by merchant address
   * @request GET:/subscription/subscription/subscriptions/{merchantAddress}
   */
  querySubscriptions = (
    merchantAddress: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<SubscriptionQuerySubscriptionsResponse, RpcStatus>({
      path: `/subscription/subscription/subscriptions/${merchantAddress}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}