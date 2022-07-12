import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';

axios.defaults.withCredentials = true;

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
