import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='sticky bottom-0 z-[99] box-border h-20 w-full border-t-[1px] border-t-gray-400 bg-white'>
      <ul className='flex h-full'>
        <li className='flex flex-1 items-center justify-center'>
          <Link href='/recomand'>
            <a>recomand</a>
          </Link>
        </li>
        <li className='flex flex-1 items-center justify-center'>
          <Link href='/home'>
            <a>home</a>
          </Link>
        </li>
        <li className='flex flex-1 items-center justify-center'>
          <Link href='/mypage'>
            <a>mypage</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
