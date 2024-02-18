import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgDeleteContract } from "./types/subscription/subscription/tx";
import { MsgCreateSubscription } from "./types/subscription/subscription/tx";
import { MsgCreateContract } from "./types/subscription/subscription/tx";
import { MsgCreateDispute } from "./types/subscription/subscription/tx";
import { MsgUpdateDispute } from "./types/subscription/subscription/tx";
import { MsgCancelDispute } from "./types/subscription/subscription/tx";
import { MsgCreatePayment } from "./types/subscription/subscription/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/subscription.subscription.MsgDeleteContract", MsgDeleteContract],
    ["/subscription.subscription.MsgCreateSubscription", MsgCreateSubscription],
    ["/subscription.subscription.MsgCreateContract", MsgCreateContract],
    ["/subscription.subscription.MsgCreateDispute", MsgCreateDispute],
    ["/subscription.subscription.MsgUpdateDispute", MsgUpdateDispute],
    ["/subscription.subscription.MsgCancelDispute", MsgCancelDispute],
    ["/subscription.subscription.MsgCreatePayment", MsgCreatePayment],
    
];

export { msgTypes }