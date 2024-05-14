import {SmartContractInfo} from "../pages/SmartContractInfo.tsx";
import {HomePage} from "../pages/HomePage.tsx";

import {createBrowserRouter} from "react-router-dom";
import {currentContract} from "../state/CurrentContract.ts";
import {CreateSmartContract} from "../pages/CreateSmartContract.tsx";
import { LoadSmartContract } from "../service/LoadContractInfo.ts";
import {SmartContract} from "../api/model/SmartContract.ts";

export const router = createBrowserRouter([
    {
        path: "/*",
        element: (<HomePage/>),
    },
    {
        path: "/contract/:address",
        element: (<SmartContractInfo/>),
        loader: ({params}) => {
            if (!params.address) {

                return null
            }

            LoadSmartContract(
                params.address,
                (sc: SmartContract | undefined) =>  {
                    if(sc) {
                        currentContract.set(sc)
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

