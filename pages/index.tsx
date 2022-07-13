import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data } = useSWR('/api/me', fetcher);
  const router = useRouter();

  if (data) {
    router.replace('/home');
    return <div>로그인 성공</div>;
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
