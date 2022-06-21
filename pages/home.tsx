import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlants } from './api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { PlantType } from '../types/PlantType.interface';
import Layout from '../components/layout';
import Link from 'next/link';
import styled from '@emotion/styled';

const MainPage: NextPage = () => {
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
      <div className='flex flex-col items-center w-auto h-full gap-4'>
        <MyPlantList className=''>
          {plants.length === 0 ? (
            <>
              <p className='flex justify-center items-center rounded-lg bg-gray-200 w-full h-[200px]'>
                나만의 작물을 심어보세요!
              </p>
            </>
          ) : (
            <ul className='flex items-center'>
              {plants.map((plant) => {
                return (
                  <MyPlantItem key={plant.plantId} className='items-center'>
                    <Link href={`/plant/${plant.plantId}`}>
                      <a className='bg-primary flex flex-col items-center rounded-lg min-w-[181px] h-[285px] justify-between'>
                        <div className='relative w-[180px] h-[250px] border-[1px] border-gray-400 rounded-lg'>
                          <Image
                            src={plant.image}
                            alt={'my plant'}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </div>
                        <p className='text-white p-2'>{plant.name}</p>
                      </a>
                    </Link>
                    <p className='p-1'>{plant.weather}</p>
                  </MyPlantItem>
                );
              })}
            </ul>
          )}
        </MyPlantList>
        <Link href='/recomand'>
          <a className='px-8 py-2 border-[1px] border-gray-400 rounded-xl'>
            내 나무 만들기
          </a>
        </Link>
        <p>내 손안의 작은 과수원, Planti에 오신 것을 환영합니다</p>
      </div>
    </Layout>
  );
};

const MyPlantList = styled.ul`
  display: flex;
  align-items: stretch;
  gap: 8px;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-snap-type: x mandatory; /* Chrome Canary */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyPlantItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  scroll-snap-align: start; /* latest (Chrome 69+) */
  scroll-snap-coordinate: 0% 0%; /* older (Firefox/IE) */
  -webkit-scroll-snap-coordinate: 0% 0%; /* older (Safari) */
  overflow: hidden;
`;
export default MainPage;
