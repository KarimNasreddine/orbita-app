// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgCreateContract } from "./types/orbita/pay/tx";
import { MsgCreateSubscriptionPayment } from "./types/orbita/pay/tx";
import { MsgCreatePayment } from "./types/orbita/pay/tx";
import { MsgUpdateDispute } from "./types/orbita/pay/tx";
import { MsgDeleteContract } from "./types/orbita/pay/tx";
import { MsgCreateDispute } from "./types/orbita/pay/tx";
import { MsgCancelDispute } from "./types/orbita/pay/tx";

import { Contract as typeContract} from "./types"
import { Dispute as typeDispute} from "./types"
import { EventContractActivated as typeEventContractActivated} from "./types"
import { EventInsufficientFunds as typeEventInsufficientFunds} from "./types"
import { EventContractCancelled as typeEventContractCancelled} from "./types"
import { EventContractContinued as typeEventContractContinued} from "./types"
import { EpochInfo as typeEpochInfo} from "./types"
import { Params as typeParams} from "./types"
import { Payment as typePayment} from "./types"
import { SubscriptionPayment as typeSubscriptionPayment} from "./types"

export { MsgCreateContract, MsgCreateSubscriptionPayment, MsgCreatePayment, MsgUpdateDispute, MsgDeleteContract, MsgCreateDispute, MsgCancelDispute };

type sendMsgCreateContractParams = {
  value: MsgCreateContract,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreateSubscriptionPaymentParams = {
  value: MsgCreateSubscriptionPayment,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreatePaymentParams = {
  value: MsgCreatePayment,
  fee?: StdFee,
  memo?: string
};

type sendMsgUpdateDisputeParams = {
  value: MsgUpdateDispute,
  fee?: StdFee,
  memo?: string
};

type sendMsgDeleteContractParams = {
  value: MsgDeleteContract,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreateDisputeParams = {
  value: MsgCreateDispute,
  fee?: StdFee,
  memo?: string
};

type sendMsgCancelDisputeParams = {
  value: MsgCancelDispute,
  fee?: StdFee,
  memo?: string
};


type msgCreateContractParams = {
  value: MsgCreateContract,
};

type msgCreateSubscriptionPaymentParams = {
  value: MsgCreateSubscriptionPayment,
};

type msgCreatePaymentParams = {
  value: MsgCreatePayment,
};

type msgUpdateDisputeParams = {
  value: MsgUpdateDispute,
};

type msgDeleteContractParams = {
  value: MsgDeleteContract,
};

type msgCreateDisputeParams = {
  value: MsgCreateDispute,
};

type msgCancelDisputeParams = {
  value: MsgCancelDispute,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgCreateContract({ value, fee, memo }: sendMsgCreateContractParams): Promise<DeliverTxResponse> {
			console.log("signer in sendMsgCreateContract", signer); 
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateContract: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0];
				console.log("address in sendMsgCreateContract", address);
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateContract({ value: MsgCreateContract.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateContract: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreateSubscriptionPayment({ value, fee, memo }: sendMsgCreateSubscriptionPaymentParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateSubscriptionPayment: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateSubscriptionPayment({ value: MsgCreateSubscriptionPayment.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateSubscriptionPayment: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreatePayment({ value, fee, memo }: sendMsgCreatePaymentParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreatePayment: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0];				
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreatePayment({ value: MsgCreatePayment.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreatePayment: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgUpdateDispute({ value, fee, memo }: sendMsgUpdateDisputeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgUpdateDispute: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgUpdateDispute({ value: MsgUpdateDispute.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgUpdateDispute: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgDeleteContract({ value, fee, memo }: sendMsgDeleteContractParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgDeleteContract: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgDeleteContract({ value: MsgDeleteContract.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgDeleteContract: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreateDispute({ value, fee, memo }: sendMsgCreateDisputeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateDispute: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateDispute({ value: MsgCreateDispute.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateDispute: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCancelDispute({ value, fee, memo }: sendMsgCancelDisputeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCancelDispute: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCancelDispute({ value: MsgCancelDispute.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCancelDispute: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgCreateContract({ value }: msgCreateContractParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgCreateContract", value: MsgCreateContract.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateContract: Could not create message: ' + e.message)
			}
		},
		
		msgCreateSubscriptionPayment({ value }: msgCreateSubscriptionPaymentParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgCreateSubscriptionPayment", value: MsgCreateSubscriptionPayment.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateSubscriptionPayment: Could not create message: ' + e.message)
			}
		},
		
		msgCreatePayment({ value }: msgCreatePaymentParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgCreatePayment", value: MsgCreatePayment.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreatePayment: Could not create message: ' + e.message)
			}
		},
		
		msgUpdateDispute({ value }: msgUpdateDisputeParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgUpdateDispute", value: MsgUpdateDispute.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgUpdateDispute: Could not create message: ' + e.message)
			}
		},
		
		msgDeleteContract({ value }: msgDeleteContractParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgDeleteContract", value: MsgDeleteContract.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgDeleteContract: Could not create message: ' + e.message)
			}
		},
		
		msgCreateDispute({ value }: msgCreateDisputeParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgCreateDispute", value: MsgCreateDispute.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateDispute: Could not create message: ' + e.message)
			}
		},
		
		msgCancelDispute({ value }: msgCancelDisputeParams): EncodeObject {
			try {
				return { typeUrl: "/orbita.pay.MsgCancelDispute", value: MsgCancelDispute.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCancelDispute: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Contract: getStructure(typeContract.fromPartial({})),
						Dispute: getStructure(typeDispute.fromPartial({})),
						EventContractActivated: getStructure(typeEventContractActivated.fromPartial({})),
						EventInsufficientFunds: getStructure(typeEventInsufficientFunds.fromPartial({})),
						EventContractCancelled: getStructure(typeEventContractCancelled.fromPartial({})),
						EventContractContinued: getStructure(typeEventContractContinued.fromPartial({})),
						EpochInfo: getStructure(typeEpochInfo.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						Payment: getStructure(typePayment.fromPartial({})),
						SubscriptionPayment: getStructure(typeSubscriptionPayment.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			OrbitaPay: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;