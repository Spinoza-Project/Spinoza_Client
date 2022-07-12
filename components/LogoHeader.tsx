import Image from 'next/image';
import Link from 'next/link';

const LogoHeader = () => {
  return (
    <Link href='/home'>
      <a>
        <Image src='/logo.png' alt='logo' width={130} height={54} />
      </a>
    </Link>
  );
};

export default LogoHeader;
