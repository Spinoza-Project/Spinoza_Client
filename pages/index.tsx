import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data: userData } = useSWR('/api/me', fetcher);
  const router = useRouter();

  if (userData) {
    router.replace(userData === 'USER' ? '/home' : '/farmer');
    return <div>로그인 성공</div>;
  }
  return (
    <div>
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
