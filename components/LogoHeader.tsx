import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const LogoHeader = () => {
  const { data: userData } = useSWR('/api/me', fetcher);
  const router = useRouter();

  const goHome = () => {
    if (userData) {
      router.push(userData === 'USER' ? '/home' : '/farmer');
    }
  };
  return (
    <button onClick={goHome}>
      <Image src='/logo.png' alt='logo' width={130} height={54} />
    </button>
  );
};

export default LogoHeader;
