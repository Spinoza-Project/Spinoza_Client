import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <style data-href='/assets/style.css'></style>
        <style data-href='https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil&display=swap'></style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
