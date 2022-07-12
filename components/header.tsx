import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  // const { data: session, status } = useSession();

  // if (status !== 'authenticated') {
  //   return <></>;
  // }
  return (
    <header className='z-[99] drop-shadow-sm flex justify-between px-4 h-16 w-full sticky top-0 left-0 border-b-[1px] border-t-gray-400 bg-white'>
      <Image src='/logo.png' alt='logo' width={130} height={40} />
      <div className='flex items-center'>
        <Link href='/mypage'>
          <a>
            <div className='w-[40px] h-[40px] bg-gray-300 rounded-full'></div>
          </a>
        </Link>
      </div>
    </header>
  );
}
