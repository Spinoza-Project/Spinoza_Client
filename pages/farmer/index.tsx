import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import fetcher from '../../lib/fetcher';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FarmItemType } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

const FarmerHome = () => {
  const { data: userData } = useSWR('/api/me', fetcher);
  const [farmList, setFarmList] = useState<FarmItemType[]>([]);

  const router = useRouter();

  useEffect(() => {
    axios
      .get('/api/farmer/farm')
      .then((res) => {
        console.log(res);
        const {
          data: {
            data: { farms },
          },
        } = res;
        setFarmList(farms);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // if (!userData) {
  //   router.replace('/signin');
  //   return null;
  // }
  // console.log(farmList);
  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex h-full w-auto flex-col items-center justify-center gap-4'>
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
        <MyFarmList className=''>
          {!farmList || farmList.length === 0 ? (
            <>
              <p className='flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-200'>
                보유하고 있는 농장을 등록해주세요.
              </p>
            </>
          ) : (
            <ul className='flex items-center'>
              {farmList.map((farm) => {
                console.log(farm);
                return (
                  <MyFarmItem key={farm.farmId} className='items-center'>
                    <Link href={`/farmer/${farm.farmId}`}>
                      <a className='flex h-[285px] min-w-[181px] flex-col items-center justify-between rounded-lg bg-primary'>
                        <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                          <Image
                            src={farm.farmImage}
                            alt={'my plant'}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </div>
                        <p className='p-2 text-white'>{farm.farmName}</p>
                      </a>
                    </Link>
                    <p className='p-1'>{farm.weather}</p>
                  </MyFarmItem>
                );
              })}
            </ul>
          )}
        </MyFarmList>
        <p>내 손안의 작은 과수원, Planti에 오신 것을 환영합니다</p>
      </div>
    </Layout>
  );
};
const MyFarmList = styled.ul`
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

const MyFarmItem = styled.li`
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
export default FarmerHome;
