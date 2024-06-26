import {SmartContract} from "../api/model/SmartContract.ts";
import {fromTonPoint} from "../api/model/Point.ts";
import {getSmartContract} from "./SmartContract.ts";

export async function LoadSmartContract(
    address: string,
    callback: (sc: SmartContract | undefined) => void,
) {
    const contract = await getSmartContract(address)

    const sc = {} as SmartContract

    sc.address = address
    let  totalInfo;
    try {
        totalInfo = await contract.getTotalInfo()
    } catch (e) {
        if (!e) {
            console.error(e)
            return
        }

        if (e.toString() == 'Error: Exit code: -256') {

        }
        return
    }

    sc.ownerAddress = totalInfo.owner.toString()
    sc.state = totalInfo.state
    if (totalInfo.courier) {
        sc.courierAddress = totalInfo.courier.toString()
    }

    sc.name = totalInfo.short.name
    sc.description = totalInfo.short.description

    sc.courierFee = totalInfo.short.courierFee
    sc.declaredValue = totalInfo.short.declaredSum

    sc.to = fromTonPoint(totalInfo.short.to)
    sc.from = fromTonPoint(totalInfo.short.from)


    callback(sc)
}


