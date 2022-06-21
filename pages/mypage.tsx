import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { PlantType } from '../types/PlantType.interface';
import { getPlants } from './api';

const MyPage: NextPage = () => {
  const [plants, setPlants] = useState<PlantType[]>([]);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { plants },
        } = await getPlants();
        setPlants(plants);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }
  return (
    <Layout>
      <ul>
        {plants.length === 0 ? (
          <>
            <p>나만의 작물을 심어보세요!</p>
          </>
        ) : (
          <>
            {plants.map((plant) => {
              return (
                <li key={plant.plantId}>
                  <Link href={`/plant/${plant.plantId}`}>
                    <a>
                      <Image
                        src={plant.image}
                        alt={'my plant'}
                        width={100}
                        height={100}
                      />
                    </a>
                  </Link>
                </li>
              );
            })}
          </>
        )}
      </ul>
      <ul>
        <li>
          <button type='button'>구매내역 확인하기</button>
        </li>
        <li>
          <button type='button'>환경설정</button>
        </li>
      </ul>
    </Layout>
  );
};

export default MyPage;
