import {Address, SenderArguments, Sender, toNano} from "@ton/core";
import memoize from "lodash.memoize";
import {TonConnectUI} from "@tonconnect/ui-react";
import {getSmartContract} from "./SmartContract.ts";
import {SmartContract} from "../api/model/SmartContract.ts";
import {OperationFee} from "./dictionary/Fee.ts";
import TonConnect from '@tonconnect/sdk';
export async function depositToContract(tonConnectUI: TonConnectUI, sc: SmartContract) {

    const contract = await getSmartContract(sc.address)

    if (tonConnectUI.account == null) {
        throw 'no account to send from'
    }

    const userAddress = Address.parse(tonConnectUI.account.address)

    const amount = sc.courierFee+sc.declaredValue+toNano(OperationFee);

    async function send(args: SenderArguments) {
        if (!args.body) {
            throw 'no body'
        }

        await tonConnectUI.sendTransaction({
                validUntil:  Math.floor(Date.now() / 1000) + 360,
                messages: [
                    {
                        address: args.to.toRawString(),
                        amount: args.value.toString(),
                        payload: args.body.toBoc().toString('base64'),
                    }
                ]
            })
    }

    contract.send(
        {
            address: userAddress,
            send: send,
        },
        {
            value: amount,
            bounce: false
        },
        'start',
    )
}


export default memoize(depositToContract)
