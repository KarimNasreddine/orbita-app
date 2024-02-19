import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateContract } from "./types/orbita/pay/tx";
import { MsgCreateSubscriptionPayment } from "./types/orbita/pay/tx";
import { MsgCreatePayment } from "./types/orbita/pay/tx";
import { MsgUpdateDispute } from "./types/orbita/pay/tx";
import { MsgDeleteContract } from "./types/orbita/pay/tx";
import { MsgCreateDispute } from "./types/orbita/pay/tx";
import { MsgCancelDispute } from "./types/orbita/pay/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/orbita.pay.MsgCreateContract", MsgCreateContract],
    ["/orbita.pay.MsgCreateSubscriptionPayment", MsgCreateSubscriptionPayment],
    ["/orbita.pay.MsgCreatePayment", MsgCreatePayment],
    ["/orbita.pay.MsgUpdateDispute", MsgUpdateDispute],
    ["/orbita.pay.MsgDeleteContract", MsgDeleteContract],
    ["/orbita.pay.MsgCreateDispute", MsgCreateDispute],
    ["/orbita.pay.MsgCancelDispute", MsgCancelDispute],
    
];

export { msgTypes }