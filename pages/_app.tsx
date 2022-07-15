import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { Provider } from 'jotai';

axios.defaults.withCredentials = true;

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
