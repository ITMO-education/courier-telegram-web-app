import cls from "./HomePage.module.css"
import {TonConnectButton, useTonAddress} from "@tonconnect/ui-react";
import {ContractListItem} from "../components/ContractListItem.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ActionButton} from "../components/ActionButton/ActionButton.tsx";
import {listContracts} from "../api/backend/api.ts";
import {useHookstate} from "@hookstate/core";
import {isCourier, toggleIsCourier} from "../state/User.ts";
import Toggle from "react-toggle";
import "react-toggle/style.css"

export function HomePage() {

    const [addrs, setContractAddresses] = useState<string[]>([])

    const isUserCourier = useHookstate(isCourier()).get()

    const userAddress = useTonAddress()
    useEffect(() => {
        listContracts({limit: 10, offset: 0, owner: userAddress}).then(r => {
            return r.map(c => c.tonAddress)
        }).then(r => {
            setContractAddresses(r)
        })

    }, []);

    return (
        <div className={cls.HomePage}>
            <div className={cls.Header}>
                <div className={cls.HeaderSideElement}></div>
                <div className={cls.HeaderTittle}>{isUserCourier? 'Я доставляю' : 'Мне доставляют'}</div>
                <div className={cls.HeaderSideElement}>
                    <div className={cls.ToggleButton}>
                        <div className={cls.ToggleTittle}></div>
                        <div className={cls.ToggleButton}>
                            <a style={{textAlign: 'center'}}>Режим курьера</a>
                            <Toggle
                                id='courier-status'
                                defaultChecked={isUserCourier}
                                onChange={(_) => {
                                    toggleIsCourier()
                                }}/>
                        </div>
                    </div>
                </div>

            </div>
            <div className={cls.ContractsList}>
                {addrs.map((a) => {
                    return (
                        <Link key={a} to={`/contract/${a}`}>
                            <button className={cls.ListItem}>
                                <ContractListItem contractAddressStr={a}/>
                            </button>
                        </Link>
                    )
                })}
            </div>

            <div className={cls.ButtonContainer}>
                <div className={cls.UserButton}>
                    <TonConnectButton/>
                </div>
                {
                        !isUserCourier?
                        <div className={cls.AddButton}>
                            <Link to={`/create`} style={{textDecoration: 'none'}}>
                                <ActionButton text={"Новый запрос"}/>
                            </Link>
                        </div> : <></>
                }
            </div>
        </div>
    )
}
