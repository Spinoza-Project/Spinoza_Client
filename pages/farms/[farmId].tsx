import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { getFarmDetail } from '../api';
import { FarmDetailType } from '../../types/FarmDetailType.interface';
import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';

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
    <Layout>
      <div className='flex flex-col pt-4 gap-6'>
        <div className='flex flex-col items-center'>
          <FarmImages className='p-4 w-full flex gap-3 snap-x snap-mandatory overflow-x-auto scroll-none'>
            {farmDetail?.images.map((image, index) => {
              return (
                <li key={index} className='snap-center snap-normal'>
                  <div className='z-10 relative w-[256px] h-[178px] drop-shadow-md'>
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
          <div className='min-w-[80%] min-h-[158px] relative bottom-12 pt-16 px-4 pb-4 bg-gray-200 rounded-xl grid grid-cols-4 grid-rows-4 justify-items-center'>
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
          <ul className='grid grid-cols-3 bg-gray-200 p-1 justify-items-center rounded-xl w-full'>
            {farmDetail?.fruitTypes.map((fruitType, index) => {
              return (
                <li key={index} className='flex gap-2 items-center'>
                  <div className='relative w-4 h-4'>
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
          <p className='bg-gray-200 p-3 rounded-xl w-full'>
            {farmDetail?.introduction}
          </p>
        </div>
        <Link href={`/reservation/${query.farmId}`}>
          <a className='flex justify-center items-center px-8 py-2 border-[1px] border-gray-400 rounded-xl'>
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
