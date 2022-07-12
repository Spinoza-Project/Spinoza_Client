import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode } from 'react';
import Header from './header';
import Nav from './nav';

interface PropsType {
  leftChild?: ReactNode | JSX.Element;
  middleChild?: ReactNode | JSX.Element;
  rightChild?: ReactNode | JSX.Element;
  hasNav?: boolean;
}

const Layout = ({
  leftChild,
  middleChild,
  rightChild,
  hasNav = true,
  children,
}: PropsWithChildren<PropsType>) => {
  const router = useRouter();

  // if (!data) {
  //   router.replace('/login');
  //   return <p>로그인 페이지로 이동합니다.</p>;
  // }
  return (
    <>
      <Header
        leftChild={leftChild}
        middleChild={middleChild}
        rightChild={rightChild}
      />
      <main className='bg-gray-100'>
        <div className='mx-auto my-0 min-h-screen bg-white px-4 md:w-3/4 lg:w-[768px]'>
          {children}
        </div>
      </main>
      {/* {hasNav && <Nav />} */}
    </>
  );
};
export default Layout;
