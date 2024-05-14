import cls from './ContractListItem.module.css'

import {GetStateName} from "../service/dictionary/ContractState.ts";
import {useEffect, useState} from "react";
import {SmartContract} from "../api/model/SmartContract.ts";
import {TonAddress} from "./TonAddress/TonAddress.tsx";
import LoadContractInfo from "../service/LoadContractInfo.ts";

interface ContractListItemProps {
    contractAddressStr: string
}

export function ContractListItem({contractAddressStr}: ContractListItemProps) {
    const [info, setInfo] =
        useState<SmartContract | undefined>()

    useEffect(() => {
        if (info) {
            return
        }
        LoadContractInfo(
            contractAddressStr,
            (sc: SmartContract | undefined) => {
                if (sc) {
                    setInfo(sc)
                }
            })
    }, []);

    if (!info) {
        return (<div className={cls.ContractListItem}>Загрузка данных...</div>)
    }

    return (
        <>
            <div className={cls.ContractListItem}>
                <div className={cls.UpperContainer}>
                    <div className={cls.Name}> {info.name} </div>
                    <div className={cls.State}> {GetStateName(info.state)}</div>
                </div>
                <div className={cls.LowerContainer}>
                    <div className={cls.Address}>
                        <TonAddress address={contractAddressStr}/>
                    </div>
                </div>
            </div>
        </>
    )
}
