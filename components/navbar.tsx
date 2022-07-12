import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  // const { data: session, status } = useSession();

  // if (status !== 'authenticated') {
  //   return <></>;
  // }
  return (
    <nav className='z-[99] sticky bottom-0 w-full h-20 border-t-[1px] border-t-gray-400 box-border bg-white'>
      <ul className='flex h-full'>
        <li className='flex-1 flex justify-center items-center'>
          <Link href='/recomand'>
            <a>recomand</a>
          </Link>
        </li>
        <li className='flex-1 flex justify-center items-center'>
          <Link href='/home'>
            <a>home</a>
          </Link>
        </li>
        <li className='flex-1 flex justify-center items-center'>
          <Link href='/mypage'>
            <a>mypage</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
