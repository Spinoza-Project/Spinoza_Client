import styled from '@emotion/styled';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import nextId from 'react-id-generator';

type plantMenuType = '모든 과일' | '장미과' | '운향과' | '오이과';

const ALL_PLANTS: plantMenuType = '모든 과일';
const ROSE: plantMenuType = '장미과';
const RUTACEAE: plantMenuType = '운향과';
const CUCUMBER: plantMenuType = '오이과';

const plantList = [
  {
    id: nextId(),
    name: '사과',
    bgColor: 'bg-[#f0394a]',
    description: '하루에 사과 한개면 의사 볼 일이 없다',
    plantImageUrl: '/images/apple.png',
    harvest: '9 ~ 11월',
    isRecomanded: true,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '복숭아',
    bgColor: 'bg-[#fdc648]',
    description: 'I got my peaches out in Gerogia, 배대시',
    plantImageUrl: '/images/peach.png',
    harvest: '6 ~ 9월',
    isRecomanded: true,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '포도',
    bgColor: 'bg-[#5e3055]',
    description: '디오니소스',
    plantImageUrl: '/images/grape.png',
    harvest: '8 ~ 10월',
    isRecomanded: true,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '자두',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/자두.png',
    harvest: '6 ~ 9월',
    isRecomanded: false,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '감',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/감.png',
    harvest: '10 ~ 11월',
    isRecomanded: false,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '배',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/배.png',
    harvest: '9 ~ 11월',
    isRecomanded: false,
    menu: ROSE,
  },
  {
    id: nextId(),
    name: '귤',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/귤.png',
    harvest: '10 ~ 12월',
    isRecomanded: false,
    menu: RUTACEAE,
  },
  {
    id: nextId(),
    name: '자몽',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/자몽.png',
    harvest: '하우스 제배',
    isRecomanded: false,
    menu: RUTACEAE,
  },
  {
    id: nextId(),
    name: '라임',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/라임.png',
    harvest: '하우스 재배',
    isRecomanded: false,
    menu: RUTACEAE,
  },
  {
    id: nextId(),
    name: '레몬',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/레몬.png',
    harvest: '4 ~ 5월',
    isRecomanded: false,
    menu: RUTACEAE,
  },
  {
    id: nextId(),
    name: '오이',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/오이.png',
    harvest: '8 ~ 9월',
    isRecomanded: false,
    menu: CUCUMBER,
  },
  {
    id: nextId(),
    name: '참외',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/참외.png',
    harvest: '7 ~ 8월',
    isRecomanded: false,
    menu: CUCUMBER,
  },
  {
    id: nextId(),
    name: '호박',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/호박.png',
    harvest: '7 ~ 11월',
    isRecomanded: false,
    menu: CUCUMBER,
  },
  {
    id: nextId(),
    name: '수박',
    bgColor: 'bg-white',
    description: '',
    plantImageUrl: '/images/수박.png',
    harvest: '7 ~ 8월',
    isRecomanded: false,
    menu: CUCUMBER,
  },
];

const plantMenu = [ALL_PLANTS, ROSE, RUTACEAE, CUCUMBER];

const Recomand: NextPage = () => {
  const [selectedPlantMenu, setSelectedPlantMenu] =
    useState<plantMenuType>(ALL_PLANTS);

  return (
    <>
      <Layout leftChild={<LogoHeader />}>
        <div className='flex min-h-full w-auto flex-col items-start'>
          <div className='py-3'>
            <h1 className='py-2 font-main text-xl'>과일 고르기</h1>
            <p className='text-sm'>
              과일 상세품종은 과수원에서 선택 가능합니다.
            </p>
          </div>
          <PlantList>
            {plantList
              .filter((plant) => plant.isRecomanded)
              .map((plant) => {
                return (
                  <PlantItem
                    key={plant.id}
                    className={`text-white ${plant.bgColor}`}
                  >
                    <Link href={`/recomand/${plant.name}`}>
                      <a className='flex flex-col'>
                        <div className='relative h-[80px] w-[80px] self-center'>
                          <Image
                            src={plant.plantImageUrl}
                            alt='plant'
                            layout='fill'
                            objectFit='cover'
                          />
                        </div>
                        <p className='flex gap-2'>
                          <span className='font-main text-lg'>
                            {plant.name}
                          </span>
                          <span className='inline-flex flex-col text-xs font-thin'>
                            <span>수확 적기</span>
                            <span>{plant.harvest}</span>
                          </span>
                        </p>
                        <p className='flex-1 text-sm'>{plant.description}</p>
                      </a>
                    </Link>
                  </PlantItem>
                );
              })}
          </PlantList>
        </div>
      </Layout>
      <div className='fixed inset-x-0 bottom-0 rounded-t-lg bg-gray-300 p-2'>
        <ul className='flex justify-between px-4 py-3'>
          {plantMenu.map((menuName, index) => {
            return (
              <li key={index}>
                <button
                  onClick={() => setSelectedPlantMenu(menuName)}
                  className={`font-main ${
                    selectedPlantMenu === menuName
                      ? 'text-primary'
                      : 'text-[#c9c9c9]'
                  }
                  `}
                >
                  {selectedPlantMenu === menuName && <span>▶︎</span>} {menuName}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className='scroll-hiden grid h-[250px] grid-cols-2 gap-4 overflow-y-scroll'>
          {plantList
            .filter((plant) => {
              if (selectedPlantMenu === ALL_PLANTS) {
                return true;
              } else {
                return selectedPlantMenu === plant.menu;
              }
            })
            .map((plant) => {
              return (
                <li
                  key={plant.id}
                  className='flex items-center justify-center gap-2 rounded-lg bg-white px-2'
                >
                  <div className='relative h-[100px] w-[100px] flex-1'>
                    <Image
                      src={plant.plantImageUrl}
                      alt='plant'
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  <div className='flex flex-1 flex-col justify-center text-center'>
                    <p className='py-1 font-main text-lg'>{plant.name}</p>
                    <p className='flex flex-col text-xs'>
                      <span>수확 적기</span>
                      <span>{plant.harvest}</span>
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

const PlantList = styled.ul`
  display: flex;
  gap: 16px;
  align-items: stretch;
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-snap-type: x mandatory; /* Chrome Canary */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PlantItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;
  min-width: 140px;
  max-height: 220px;
  max-width: 160px;
  scroll-snap-align: start; /* latest (Chrome 69+) */
  scroll-snap-coordinate: 0% 0%; /* older (Firefox/IE) */
  -webkit-scroll-snap-coordinate: 0% 0%; /* older (Safari) */
  overflow: hidden;
`;
export default Recomand;
