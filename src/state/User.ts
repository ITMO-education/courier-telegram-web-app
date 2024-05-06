import {hookstate} from "@hookstate/core";
import {useState} from "react";

interface User {
    isCourier: boolean
}
const isCourierKey = 'isCourier'

const lsVal = localStorage.getItem(isCourierKey)

const user =  hookstate<User>({isCourier: lsVal === 'true'})

export function isCourier() {
    return user.isCourier
}

export function toggleIsCourier() {
    user.isCourier.set(!user.isCourier.get())
    console.log(user.isCourier.get())
    localStorage.setItem(isCourierKey, String(user.isCourier.get()))
}


