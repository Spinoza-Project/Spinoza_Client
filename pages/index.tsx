import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Authenticated from '../components/authenticated';

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }
  if (status === 'authenticated') {
    router.replace('/home');
    return <Authenticated />;
  }
  return (
    <div className={styles.container}>
      <Link href='/signin'>
        <a>Sign In</a>
      </Link>
      <Link href='/signup'>
        <a>Sign up</a>
      </Link>
    </div>
  );
};

export default Home;
