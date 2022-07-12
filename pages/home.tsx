import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPlants, postReservation } from './api';
import Image from 'next/image';
import { PlantType } from '../types/PlantType.interface';
import Layout from '../components/layout';
import Link from 'next/link';
import styled from '@emotion/styled';
import axios from 'axios';
import LogoHeader from '../components/LogoHeader';

const MainPage: NextPage = () => {
  const initialConfig = {
    params: {
      cid: 'TC0ONETIME',
      tid: '',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      pg_token: '',
    },
  };
  const [config, setConfig] = useState(initialConfig);
  const [plants, setPlants] = useState<PlantType[]>([]);
  const router = useRouter();

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

  useEffect(() => {
    const {
      query: { pg_token },
    } = router;
    if (!pg_token) return;
    setConfig((prev) => ({
      params: {
        ...prev.params,
        pg_token: pg_token as string,
        tid: localStorage.getItem('tid') as string,
      },
    }));
  }, [router]);
  useEffect(() => {
    const { params } = config;
    if (!params.tid || !params.pg_token) return;
    console.log(params);
    axios({
      url: '/v1/payment/approve',
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      router.replace('/home');
      (async () => {
        await postReservation('62b55ddf5ebbcc992e03e3eb');
      })();
    });
  }, [config]);

  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex h-full w-auto flex-col items-center gap-4'>
        <div className='relative w-[400px]'>
          <Image
            src='/weather.png'
            alt='weather'
            width={400}
            height={250}
            // layout='fill'
            // objectFit='cover'
            // className='rounded-lg'
          />
        </div>
        <MyPlantList className=''>
          {!plants || plants.length === 0 ? (
            <>
              <p className='flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-200'>
                나만의 작물을 심어보세요!
              </p>
            </>
          ) : (
            <ul className='flex items-center'>
              {plants.map((plant) => {
                return (
                  <MyPlantItem key={plant.plantId} className='items-center'>
                    <Link href={`/plant/${plant.plantId}`}>
                      <a className='flex h-[285px] min-w-[181px] flex-col items-center justify-between rounded-lg bg-primary'>
                        <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                          <Image
                            src={plant.image}
                            alt={'my plant'}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </div>
                        <p className='p-2 text-white'>{plant.name}</p>
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
          <a className='rounded-xl border-[1px] border-gray-400 px-8 py-2'>
            🌳 내 나무 만들기
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
