import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import axios from 'axios';

// axios.defaults.baseURL =
// process.env.NODE_ENV === 'development' ? '/' : 'http://3.34.192.134:8000';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhNWZkNmIyNmMyODg2ZjlkNTg2ZDllIn0sImlhdCI6MTY1NjA3MzE0OCwiZXhwIjoxNjU2MDgwMzQ4fQ.w45UhAQOJC1vMHXeaJgSn9mKeYhVfFrEEKR8KZOfQQM';
// axios.defaults.headers.Cookie = token;
// axios.defaults.baseURL = 'http://3.34.192.134:8000';
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
  return (
    <>
      {/* <SessionProvider> */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </>
  );
}

export default MyApp;
