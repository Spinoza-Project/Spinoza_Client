import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { PlantType } from '../types/PlantType.interface';
import Layout from '../components/layout';
import Link from 'next/link';
import styled from '@emotion/styled';
import LogoHeader from '../components/LogoHeader';
import Modal from '../components/Modal';
import fetcher from '../lib/fetcher';
import useSWR from 'swr';

const MainPage: NextPage = () => {
  const { data: plantsData } = useSWR<{ plants: PlantType[] }>(
    '/api/user/plant',
    fetcher
  );
  const [plants, setPlants] = useState<PlantType[]>([]);
  const [showPlantingType, setShowPlantingType] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (plantsData) {
      setPlants(plantsData.plants);
    }
  }, [plantsData]);

  console.log(plantsData);
  const onCloseModal = () => {
    setShowPlantingType(false);
  };
  const togglePlantingTypeModal = () => {
    setShowPlantingType((prev) => !prev);
  };
  const onClickRecomand = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push('/recomand');
  };

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
        <MyPlantList>
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
                  <MyPlantItem key={plant.plantId}>
                    <Link href={`/plant/${plant.plantId}`}>
                      <a className='flex h-[285px] min-w-[181px] flex-col items-center justify-between rounded-lg bg-primary'>
                        <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                          <div className='absolute bottom-0 z-[1] h-1/3 w-full bg-gradient-to-t from-black text-center text-sm text-white'>
                            <h1>{plant.farmName}</h1>
                            <p className='mt-3'>{plant.farmAddress}</p>
                          </div>
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
                    {plant.notifications !== 0 && (
                      <span className='absolute right-7 top-7 flex h-4 w-4'>
                        <span className='relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                          {plant.notifications}
                        </span>
                      </span>
                    )}
                  </MyPlantItem>
                );
              })}
            </ul>
          )}
        </MyPlantList>
        <button
          onClick={togglePlantingTypeModal}
          className='rounded-xl border-[1px] border-gray-400 px-8 py-2'
        >
          🌳 내 나무 만들기
        </button>
        <Modal
          show={showPlantingType}
          onCloseModal={onCloseModal}
          className='fixed max-h-max w-[290px] select-none rounded-xl border border-black bg-white px-10 py-3 text-center shadow-2xl'
        >
          <form>
            <div className='flex flex-col items-center'>
              <label
                htmlFor='produce-recomand'
                className='flex items-center rounded-full bg-primary px-3 py-1 text-white'
              >
                묘목 심기
                <input
                  type='radio'
                  id='produce-recomand'
                  name='produce-recomand'
                  value='produce'
                  required
                  // onChange={onChangeRadio}
                  // checked={recomandType === 'produce'}
                  className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
                />
              </label>
              <span className='mt-1 text-xs font-thin'>
                묘목부터 시작하는 내 나무 만들기
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <label
                htmlFor='produce-recomand33'
                className='flex items-center rounded-full bg-primary px-3 py-1 text-white'
              >
                성목 분양
                <input
                  type='radio'
                  id='produce-recomand33'
                  name='produce-recomand'
                  value='produce'
                  required
                  // onChange={onChangeRadio}
                  // checked={recomandType === 'produce'}
                  className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
                />
              </label>
              <span className='mt-1 text-xs font-thin'>
                성목으로 바로 즐기는 내 과일
              </span>
            </div>
            <button
              onClick={onClickRecomand}
              className='rounded-xl border-[1px] border-gray-400 px-8 py-2'
            >
              🌳 작물 고르러 가기
            </button>
          </form>
        </Modal>
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
export default MainPage;
