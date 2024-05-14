import cls from './SmartContractInfo.module.css'

import {currentContract} from "../state/CurrentContract.ts";
import {GetStateName, StateCreated} from "../service/dictionary/ContractState.ts";
import {Address, fromNano} from "@ton/core";
import {useHookstate} from "@hookstate/core";
import {TonAddress} from "../components/TonAddress/TonAddress.tsx";
import {ReturnButton} from "../components/ReturnButton/ReturnButton.tsx";
import {MapWrapper} from "../components/Map/MapWrapper.tsx";
import {Button, FullscreenControl, GeolocationControl, Map, Placemark, SearchControl} from "@pbe/react-yandex-maps";
import {isCourier} from "../state/User.ts";
import {ActionButton} from "../components/ActionButton/ActionButton.tsx";
import {acceptContract} from "../service/AcceptContract.ts";
import {TonConnectUI, useTonAddress, useTonConnectUI} from "@tonconnect/ui-react";
import {SmartContract} from "../api/model/SmartContract.ts";
import {depositToContract} from "../service/DepositToContract.ts";
import {CO2} from "@itmo-education/courier-smart-contract";

export function SmartContractInfo() {

    const info = useHookstate(currentContract).get()
    const [tonConnectUI] = useTonConnectUI();
    const isUserCourier = useHookstate(isCourier()).get()
    const userAddress = useTonAddress(true)

    if (!info) {
        return (<div className={cls.Loading}>Smart contract not selected</div>)
    }

    if (!info.address) {
        return (<div className={cls.Loading}>Загрузка данных...</div>)
    }

    return (
        <div className={cls.SmartContractInfoContainer}>
            <div className={cls.HeaderContainer}>
                <ReturnButton to={"/"}/>
                <div className={cls.NameContainer}>{info.name}</div>
                <div>{GetStateName(info.state)}</div>
            </div>

            <div className={cls.InfoContainer}>
                <TextInfo
                    description={info.description}/>

                <PersonInfo
                    ownerAddress={info.ownerAddress}
                    courierAddress={info.courierAddress}/>

                <ValueInfo
                    declaredValue={info.declaredValue}
                    courierFee={info.courierFee}/>

                <ContractMap
                    from={[info.from.lat, info.from.lon]}
                    to={[info.to.lat, info.to.lon]}
                />

                <ContractAddress
                    address={info.address}/>
            </div>
            <div className={cls.CourierButtonWrapper}>
                {isUserCourier ?
                    <CourierButton
                        contract={info.address}
                        tonConnectUI={tonConnectUI}
                    />
                    :
                    <OwnerButton
                        userAddress={userAddress}
                        tonConnectUI={tonConnectUI}
                        info={info}/>}
            </div>
        </div>
    )
}

function ContractAddress({address}: { address: string }) {
    return (
        <div>
            <div className={cls.InfoSectionName}>
                Адрес контракта:
            </div>
            <TonAddress address={address}/>
        </div>
    )
}


function ValueInfo({declaredValue, courierFee}: {
    declaredValue: bigint | undefined,
    courierFee: bigint | undefined,
}) {
    return (
        <div className={cls.ValueContainer}>
            <div>
                <div className={cls.InfoSectionName}>
                    Заявленная ценность:
                </div>
                {fromNano(declaredValue ? declaredValue : 0n)} Ton
            </div>
            <div>
                <div className={cls.InfoSectionName}>
                    Курьерский сбор:
                </div>
                {fromNano(courierFee ? courierFee : 0n)} Ton
            </div>
        </div>
    )
}

function PersonInfo({ownerAddress, courierAddress}: {
    ownerAddress: string,
    courierAddress: string | undefined
}) {
    return (
        <div className={cls.PersonContainer}>
            <div className={cls.Person}>
                <div className={cls.InfoSectionName}>
                    Владелец:
                </div>
                <TonAddress address={ownerAddress}/>
            </div>
            <div className={cls.Person}>
                <div className={cls.InfoSectionName}>
                    Курьер:
                </div>
                <TonAddress address={courierAddress || "Not selected"}/>
            </div>
        </div>
    )
}

function TextInfo({description}: { description: string }) {
    return (
        <div>
            <div className={cls.InfoSectionName}>
                Описание:
            </div>
            <div className={cls.DescriptionContainer}>
                {description}
            </div>
        </div>
    )
}

function ContractMap({from, to}: { from: number[], to: number[] }) {
    return (
        <MapWrapper>
            <Map
                style={{width: '100%', height: '100%'}}
                defaultState={{center: from, zoom: 13}}
            >
                <FullscreenControl/>

                <GeolocationControl
                    options={{
                        float: "left",
                        adjustMapMargin: true,
                    }}
                />


                <Placemark
                    geometry={from}
                />
                <Placemark
                    geometry={to}
                    options={{
                        iconColor: 'red'
                    }}
                />
            </Map>
        </MapWrapper>
    )
}

function CourierButton({contract, tonConnectUI}: {
    contract: string,
    tonConnectUI: TonConnectUI,
}) {
    return (
        <ActionButton
            text={"Принять заказ"}
            action={async () => {
                await acceptContract(tonConnectUI, contract)
            }}
        />
    )
}

function OwnerButton(
    {userAddress, info, tonConnectUI}:
        {
            userAddress: string,
            info: SmartContract,
            tonConnectUI: TonConnectUI
        }) {


    const userAddr = Address.parse(userAddress).toString({})
    const ownerAddr = Address.parse(info.ownerAddress).toString({})

    if (userAddr != ownerAddr) {
        return <></>
    }

    if (info.state === StateCreated) {
        return (
            <ActionButton
                text={"Оплатить"}
                action={
                    () => {
                        depositToContract(tonConnectUI, info.address, info.declaredValue + info.courierFee)
                    }}
            />
        )
    }

    return (<></>)
}
