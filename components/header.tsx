import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') {
    return <></>;
  }
  return (
    <header className='drop-shadow-sm flex justify-between px-4 h-16 w-full sticky top-0 left-0 border-b-[1px] border-t-gray-400 bg-white z-10'>
      <h1 className='flex items-center'>planti</h1>
      <div className='flex items-center'>
        <Link href='/mypage'>
          <a>MY</a>
        </Link>
      </div>
    </header>
  );
}
