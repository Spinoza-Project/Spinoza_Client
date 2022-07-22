import useSWR from 'swr';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import fetcher from '../../lib/fetcher';
import { useEffect, useState } from 'react';
import { FarmItemType } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

const FarmerHome = () => {
  const { data: farmListData } = useSWR<{ farms: FarmItemType[] }>(
    '/api/farmer/farm',
    fetcher
  );
  const [farmList, setFarmList] = useState<FarmItemType[]>([]);

  useEffect(() => {
    if (farmListData) {
      setFarmList(farmListData.farms);
    }
  }, [farmListData]);
  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex h-full w-auto flex-col items-center justify-center gap-4 py-4'>
        <div className='relative h-[250px] w-[350px]'>
          <Image
            src='/images/yeongju.png'
            alt='yeongju'
            layout='fill'
            objectFit='cover'
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
              {farmList.map((farm, index) => {
                return (
                  <MyFarmItem key={farm.farmId}>
                    <Link href={`/farmer/${farm.farmId}`}>
                      <a className='flex h-[285px] min-w-[181px] flex-col items-center justify-between rounded-lg bg-primary'>
                        <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                          <div className='absolute bottom-0 z-[1] h-1/3 w-full rounded-b-lg bg-gradient-to-t from-neutral-800 text-center text-sm text-white'>
                            <p className='mt-3'>{farm.farmAddress}</p>
                          </div>
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
                    {/* {farm.notifications !== 0 && ( */}
                    {index === 2 && (
                      <span className='absolute right-7 top-7 flex'>
                        <span className='min-w-4 relative inline-flex h-4 max-w-max items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white'>
                          {1}
                        </span>
                      </span>
                    )}
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
  position: relative;
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
