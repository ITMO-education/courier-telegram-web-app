import {BackendContract} from "./BackendContract.ts";

// `http://localhost:8080`
const backendApi = import.meta.env.VITE_BACKEND_URL

const contractURI = '/contract'

export async function register({contract}: { contract: BackendContract }) {
    await fetch(
        `${backendApi}${contractURI}`,
        {
            method: 'POST',
            headers: {
                accept: 'application/json',
            },
            body: JSON.stringify(contract),
        })
}

interface listContractsReq {
    limit: number
    offset: number
    owner?: string
}

export async function listContracts({limit, offset, owner}: listContractsReq): Promise<BackendContract[]> {
    const res: BackendContract[] = [];
    await fetch(
        `${backendApi}${contractURI}?limit=${limit}&offset=${offset}`+(owner ? `&owner=${owner}`: ``),
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        }).then(res => res.json())
        .then(r => {
            r.map((c: BackendContract) => res.push(c))
        })

    return res
}
