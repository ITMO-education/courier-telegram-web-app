import {SmartContractInfo} from "../pages/SmartContractInfo.tsx";
import {HomePage} from "../pages/HomePage.tsx";

import {createBrowserRouter} from "react-router-dom";
import {currentContract} from "../state/CurrentContract.ts";
import {CreateSmartContract} from "../pages/CreateSmartContract.tsx";
import LoadContractInfo from "../service/LoadContractInfo.ts";

export const router = createBrowserRouter([
    {
        path: "/*",
        element: (<HomePage/>),
    },
    {
        path: "/contract/:address",
        element: (<SmartContractInfo/>),
        loader: ({ params}) => {
            if (!params.address) {
                return null
            }

            LoadContractInfo(params.address).then((res)=> {
                if (res) {
                    currentContract.set(res)
                }

            })
            return null
        }
    },
    {
        path: "/create",
        element: (<CreateSmartContract/>),
    }

]);

