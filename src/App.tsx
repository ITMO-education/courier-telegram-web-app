import cls from './App.module.css';

import {TonConnectButton} from '@tonconnect/ui-react';

import {HomePage} from "./pages/HomePage.tsx";


interface AppProps {
    useTonAddress: () => string
}

function App({useTonAddress}: AppProps) {
    let component: React.ReactElement;

    if (useTonAddress() == "") {
        component = (
            <TonConnectButton/>
        );
    } else {
        component = (<HomePage/>)
    }

    return <div className={cls.homeContainer}>
        {component}
    </div>
}

export default App
