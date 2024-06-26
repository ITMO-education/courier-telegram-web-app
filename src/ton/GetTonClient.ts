import {getHttpEndpoint, getHttpV4Endpoint} from '@orbs-network/ton-access';
import {TonClient, TonClient4} from "@ton/ton";
import memoize from "lodash.memoize";

const useTonClient = async () => {
    return new TonClient4(
        {
            endpoint: await getHttpV4Endpoint({network: 'testnet'}
            )
        })
}


export default memoize(useTonClient)
