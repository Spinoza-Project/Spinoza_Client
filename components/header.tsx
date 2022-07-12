import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='sticky top-0 left-0 z-[99] flex h-16 w-full justify-between border-b-[1px] border-t-gray-400 bg-white px-4 drop-shadow-sm'>
      <Image src='/logo.png' alt='logo' width={130} height={40} />
      <div className='flex items-center'>
        <Link href='/mypage'>
          <a>
            <div className='h-[40px] w-[40px] rounded-full bg-gray-300'></div>
          </a>
        </Link>
      </div>
    </header>
  );
}
