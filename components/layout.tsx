import { PropsWithChildren } from 'react';
import Navbar from './navbar';
import Header from './header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }

  return (
    <>
      <Header />
      <main className='px-4 min-h-screen'>{children}</main>
      <Navbar />
    </>
  );
}
