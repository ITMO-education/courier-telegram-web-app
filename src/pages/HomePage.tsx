import cls from './homePage.module.css'

import {TonConnectButton} from "@tonconnect/ui-react";
import {ActionButton} from "../components/CreateButton/ActionButton.tsx";

export function HomePage() {
    return (
        <div className={cls.HomePage}>

            <div className={cls.contracts}>

            </div>

            <div className={cls.buttonContainer}>
                <div className={cls.sideContainer}>
                    <TonConnectButton/>
                </div>

                <div className={cls.sideContainer}>
                    <ActionButton
                        text={"Создать"}
                        action={()=>{}}
                    />
                </div>
            </div>
        </div>
    )
}
