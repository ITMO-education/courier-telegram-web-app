import {Address, beginCell, OpenedContract, SenderArguments, storeStateInit, toNano} from "@ton/core";
import memoize from "lodash.memoize";
import {TonConnectUI} from "@tonconnect/ui-react";
import {getSmartContract} from "./SmartContract.ts";

export async function depositToContract(tonConnectUI: TonConnectUI, address: string, amount: bigint) {

    const contract = await getSmartContract(address)

    if (tonConnectUI.account == null) {
        throw 'no account to send from'
    }

    const userAddress = Address.parse(tonConnectUI.account.address)

    async function send(args: SenderArguments) {
        console.log(args)
        console.log(amount)
    }

    contract.send(
        {
            address: userAddress,
            send: send,
        },
        {
            value: toNano('1.1'),
            bounce: true
        },
        'accept',
    )
}


export default memoize(depositToContract)