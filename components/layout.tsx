import { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Header from './header';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main className='px-4 min-h-screen'>{children}</main>
      <Navbar />
    </>
  );
}
