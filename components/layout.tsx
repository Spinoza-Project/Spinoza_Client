import Link from 'next/link';
import { ReactNode } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Header from './header';
import Nav from './nav';
import Avatar from 'react-avatar';

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
  const Profile = (
    <Link href={userData === 'USER' ? '/home' : '/farmer'}>
      <a>
        <Avatar name={userData} size='35' round={true} />
      </a>
    </Link>
  );

  return (
    <>
      <Header
        leftChild={leftChild}
        middleChild={middleChild}
        rightChild={Profile}
      />
      <main className='relative max-h-max min-h-screen bg-gray-100'>
        <div className='relative mx-auto my-0 min-h-screen bg-white px-4 pt-16 md:w-3/4 lg:w-[768px]'>
          {children}
        </div>
      </main>
      {/* {hasNav && <Nav />} */}
    </>
  );
};
export default Layout;
