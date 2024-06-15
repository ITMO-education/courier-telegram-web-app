import {defineConfig, loadEnv} from 'vite';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';

// @ts-expect-error
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        plugins: [react(), nodePolyfills()],
        base: '/courier-telegram-web-app',
    });
}
