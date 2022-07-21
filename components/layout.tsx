import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Header from './header';
import Nav from './nav';

interface PropsType {
  leftChild?: ReactNode | JSX.Element;
  middleChild?: ReactNode | JSX.Element;
  rightChild?: ReactNode | JSX.Element;
  hasNav?: boolean;
  children?: ReactNode;
}

const Layout: React.FC<PropsType> = ({
  leftChild,
  middleChild,
  rightChild,
  hasNav = true,
  children,
}) => {
  const { data: userData, error } = useSWR('/api/me', fetcher);

  if (!userData) {
    return (
      <div>
        <p>로그인이 만료되었습니다.</p>
        <Link href='/signin'>
          <a>로그인 페이지로 이동</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header
        leftChild={leftChild}
        middleChild={middleChild}
        rightChild={rightChild}
      />
      <main className='bg-gray-100 pt-16'>
        <div className='mx-auto my-0 bg-white px-4 md:w-3/4 lg:w-[768px]'>
          {children}
        </div>
      </main>
      {/* {hasNav && <Nav />} */}
    </>
  );
};
export default Layout;
