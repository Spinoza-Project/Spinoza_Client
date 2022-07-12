import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { getFarmDetail } from '../api';
import { FarmDetailType } from '../../types/FarmDetailType.interface';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import LogoHeader from '../../components/LogoHeader';

const FormDetail: NextPage = () => {
  const [farmDetail, setFarmDetail] = useState<FarmDetailType>();
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getFarmDetail(query.farmId as string);
        setFarmDetail(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [query]);

  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex flex-col gap-6 pt-4'>
        <div className='flex flex-col items-center'>
          <FarmImages className='scroll-none flex w-full snap-x snap-mandatory gap-3 overflow-x-auto p-4'>
            {farmDetail?.images.map((image, index) => {
              return (
                <li key={index} className='snap-center snap-normal'>
                  <div className='relative z-10 h-[178px] w-[256px] drop-shadow-md'>
                    <Image
                      src={image}
                      alt='농장 사진'
                      layout='fill'
                      objectFit='cover'
                      className='rounded-xl'
                    />
                  </div>
                </li>
              );
            })}
          </FarmImages>
          <div className='relative bottom-12 grid min-h-[158px] min-w-[80%] grid-cols-4 grid-rows-4 justify-items-center rounded-xl bg-gray-200 px-4 pt-16 pb-4'>
            <h3 className='col-span-4 font-bold'>주소</h3>
            <p className='col-span-4'>{farmDetail?.address}</p>
            <h3 className='col-span-2 font-bold'>과수원 주인 연락처</h3>
            <h3 className='col-span-2 font-bold'>리뷰</h3>
            <p className='col-span-2'>{farmDetail?.phoneNumber}</p>
            <p className='col-span-2'>{'4.5 / 5'}</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-bold'>과수원 품종 정보</h3>
          <ul className='grid w-full grid-cols-3 justify-items-center rounded-xl bg-gray-200 p-1'>
            {farmDetail?.fruitTypes.map((fruitType, index) => {
              return (
                <li key={index} className='flex items-center gap-2'>
                  <div className='relative h-4 w-4'>
                    <Image
                      src={fruitType.image}
                      alt='fruitType'
                      layout='fill'
                      objectFit='cover'
                      className='rounded-xl'
                    />
                  </div>
                  <span>{fruitType.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex flex-col items-center'>
          <h3 className='font-bold'>과수원의 한마디</h3>
          <p className='w-full rounded-xl bg-gray-200 p-3'>
            {farmDetail?.introduction}
          </p>
        </div>
        <Link href={`/reservation/${query.farmId}`}>
          <a className='flex items-center justify-center rounded-xl border-[1px] border-gray-400 px-8 py-2'>
            🌳 나무 자리 고르기
          </a>
        </Link>
      </div>
    </Layout>
  );
};

const FarmImages = styled.ul`
  -ms-overflow-style: 'none';
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FruitType = styled.div<{ fruitTypeColor: string }>`
  background-color: ${(props) => props.fruitTypeColor};
`;
export default FormDetail;
