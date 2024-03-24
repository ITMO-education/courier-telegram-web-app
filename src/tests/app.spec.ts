import {GetAccount, Login, Logout} from "../state/log.ts";

describe('AccountState', () => {

    it('🟢Logged', () => {
        const  id: string = "1";
        Login({id: id});
        const accountLogged = GetAccount();
        expect(accountLogged.id).toEqual("2");
    })

    it('🟢Unlogged', () => {
        const  id: string = "1";
        Login({id: id});
        Logout()

        const accountUnlogged = GetAccount()
        expect(accountUnlogged.id).toEqual(undefined)
    })
})
