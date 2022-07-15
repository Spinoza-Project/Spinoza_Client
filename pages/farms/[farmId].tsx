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
import Modal from '../../components/Modal';

const FarmDetail: NextPage = () => {
  const [farmDetail, setFarmDetail] = useState<FarmDetailType>();
  const [showFruitTypeDetail, setShowFruitTypeDetail] = useState({
    fruitTypeId: '',
  });

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const { farmId } = query;
    if (!farmId) return;
    (async () => {
      try {
        const { data } = await getFarmDetail(query.farmId as string);
        setFarmDetail(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [router]);

  const toggleFruitTypeDetail = (fruitTypeId: string) => {
    setShowFruitTypeDetail((prev) => ({
      fruitTypeId: fruitTypeId,
    }));
  };

  const onCloseModal = () => {
    setShowFruitTypeDetail((prev) => ({
      ...prev,
      fruitTypeId: '',
    }));
  };

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
            <p className='col-span-2'>{`${farmDetail?.grade} / 5`}</p>
          </div>
        </div>

        <div className='flex justify-center'>
          <ul className='flex gap-4'>
            {farmDetail?.tours.map((tour) => {
              return (
                <li key={tour['_id']} className='flex flex-col items-center'>
                  {/* <div className='relative h-[60px] w-[60px] rounded-full'></div> */}
                  {/* <Image
                    src={tour.tourImage}
                    alt='tour image'
                    layout='fill'
                    objectFit='cover'
                  /> */}
                  <span className='text-xs'>{tour.distance}km</span>
                  <img
                    src={tour.tourImage}
                    width={60}
                    height={60}
                    alt='tour image'
                    className='rounded-full'
                  />
                  <span>{tour.tourName}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='mb-2 font-bold'>과수원 품종 정보</h3>
          <ul className='relative grid w-full grid-cols-3 justify-items-center rounded-xl bg-gray-200 p-1'>
            {farmDetail?.fruitTypes.map((fruitType) => {
              return (
                <div key={fruitType['_id']}>
                  <li
                    className='flex cursor-pointer items-center gap-2'
                    onClick={() => toggleFruitTypeDetail(fruitType['_id'])}
                  >
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
                  <Modal
                    show={showFruitTypeDetail.fruitTypeId === fruitType['_id']}
                    onCloseModal={onCloseModal}
                    className='absolute top-10 left-1/4 max-h-max w-[290px] select-none flex-col rounded-xl border border-black bg-white px-10 py-3 text-center shadow-2xl'
                  >
                    <h1 className='flex items-center justify-center gap-2'>
                      <div className='relative h-4 w-4'>
                        <Image
                          src={fruitType.image}
                          alt='fruitType'
                          layout='fill'
                          objectFit='cover'
                          className='rounded-xl'
                        />
                      </div>
                      <span className='text-xl font-bold'>
                        {fruitType.name}
                      </span>
                    </h1>
                    <p>
                      {fruitType.information.split('\n').map((line) => {
                        return (
                          <>
                            {line}
                            <br />
                          </>
                        );
                      })}
                    </p>
                  </Modal>
                </div>
              );
            })}
          </ul>
          <p className='mt-1 flex items-center text-sm text-gray-400'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </span>
            품종을 눌러 품정 정보를 확인해보세요!
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='mb-2 font-bold'>과수원의 특징</h3>
          <ul className='flex w-full flex-wrap justify-between'>
            {farmDetail?.hashTags.map((tag, index) => {
              return (
                <li key={index} className='rounded-full bg-gray-200 px-4'>
                  # {tag}
                </li>
              );
            })}
          </ul>
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='mb-2 font-bold'>과수원의 한마디</h3>
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
export default FarmDetail;
