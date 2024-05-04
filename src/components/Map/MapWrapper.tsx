import {YMaps} from "@pbe/react-yandex-maps";
import {ReactNode} from "react";

import {Children} from 'react';

export function MapWrapper({children}: { children: ReactNode }) {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <YMaps query={
                {
                    apikey: "26bf80e8-684a-4cc9-b148-46fb455bbbe8", //TODO вынести в переменные
                    lang: 'ru_RU',
                }}
            >
                {
                    Children.map(children, child =>
                        <>
                            {child}
                        </>
                    )}
            </YMaps>
        </div>
    )
}
