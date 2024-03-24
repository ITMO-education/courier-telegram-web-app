import { hookstate } from '@hookstate/core';

interface Account {
    id: string
}

const logged = hookstate({
    id:""
} as Account)


export function Login(a: Account) {
    logged.set(a)
}

export function Logout() {
    logged.set({} as Account)
}

export function GetAccount(): Account {
    return logged.get()
}
