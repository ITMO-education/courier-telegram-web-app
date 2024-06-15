import {Address, beginCell, OpenedContract, SenderArguments, storeStateInit, toNano} from "@ton/core";
import memoize from "lodash.memoize";
import {TonConnectUI} from "@tonconnect/ui-react";
import {getSmartContract} from "./SmartContract.ts";
import {OperationFee} from "./dictionary/Fee.ts";
import {SmartContract} from "../api/model/SmartContract.ts";

export async function acceptContract(tonConnectUI: TonConnectUI, sc: SmartContract) {

    const contract = await getSmartContract(sc.address)

    if (tonConnectUI.account == null) {
        throw 'no account to send from'
    }

    const userAddress = Address.parse(tonConnectUI.account.address)

    const amount = sc.declaredValue+OperationFee;

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
        'accept',
    )
}


export default memoize(acceptContract)
