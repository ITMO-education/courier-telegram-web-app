import './index.css';

import ReactDOM from 'react-dom/client';
import App from './App';

import {TonConnectUIProvider, useTonAddress} from '@tonconnect/ui-react';
//
// this manifest is used temporarily for development purposes
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App useTonAddress={useTonAddress}/>
    </TonConnectUIProvider>,
)
