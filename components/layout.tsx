import { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Header from './header';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main className='min-h-screen overflow-scroll px-4'>{children}</main>
      {/* <Navbar /> */}
    </>
  );
}
