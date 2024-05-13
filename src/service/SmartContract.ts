import getTonClient from "../ton/GetTonClient.ts";
import {CO2} from "@itmo-education/courier-smart-contract";
import {Address, OpenedContract} from "@ton/core";

export async function getSmartContract(address: string) {
    const client = await getTonClient()

    return client.open(
        CO2.fromAddress(
            Address.parse(address))) as OpenedContract<CO2>
}
