import cls from './SmartContractInfo.module.css'

import {currentContract} from "../state/CurrentContract.ts";
import {GetStateName} from "../service/dictionary/ContractState.ts";
import {fromNano} from "@ton/core";
import {useHookstate} from "@hookstate/core";
import {TonAddress} from "../components/TonAddress/TonAddress.tsx";
import {ReturnButton} from "../components/ReturnButton/ReturnButton.tsx";
import {MapWrapper} from "../components/Map/MapWrapper.tsx";
import {Button, FullscreenControl, GeolocationControl, Map, Placemark, SearchControl} from "@pbe/react-yandex-maps";

export function SmartContractInfo() {

    const info = useHookstate(currentContract).get()

    if (!info) {
        return (<div className={cls.Loading}>Smart contract not selected</div>)
    }

    if (!info.address) {
        return (<div className={cls.Loading}>Loading...</div>)
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
        </div>
    )
}

function ContractAddress({address}: { address: string }) {
    return (
        <div>
            <div className={cls.InfoSectionName}>
                Contract:
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
                    Declared Value:
                </div>
                {fromNano(declaredValue ? declaredValue : 0n)} Ton
            </div>
            <div>
                <div className={cls.InfoSectionName}>
                    Courier fee:
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
                    Owner:
                </div>
                <TonAddress address={ownerAddress}/>
            </div>
            <div className={cls.Person}>
                <div className={cls.InfoSectionName}>
                    Courier:
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
                Description:
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
