import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks');
}

declare global {
  interface Window {
    kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
