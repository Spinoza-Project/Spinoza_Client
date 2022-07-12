import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const plantList = [
  {
    name: '사과',
    bgColor: 'bg-[#f0394a]',
    description: '하루에 사과 한개면 의사 볼 일이 없다',
    plantImageUrl: '/images/apple.png',
  },
  {
    name: '복숭아',
    bgColor: 'bg-[#fdc648]',
    description: 'I got my peaches out in Gerogia, 배대시',
    plantImageUrl: '/images/peach.png',
  },
  {
    name: '포도',
    bgColor: 'bg-[#5e3055]',
    description: '디오니소스',
    plantImageUrl: '/images/grape.png',
  },
];

const Recomand: NextPage = () => {
  const router = useRouter();
  // const { status } = useSession();

  // if (status === 'unauthenticated') {
  //   router.replace('/signin');
  //   return <div>로그인하세요.</div>;
  // }

  return (
    <Layout>
      <div className='flex flex-col items-start w-auto min-h-full'>
        <div className='py-12'>
          <h1 className='py-2 text-xl'>과일 고르기</h1>
          <p>과일 상세품종은 과수원에서 선택 가능합니다.</p>
        </div>
        <PlantList>
          {plantList.map((plant, index) => {
            return (
              <PlantItem key={index} className={`text-white ${plant.bgColor}`}>
                <Link href={`/recomand/${plant.name}`}>
                  <a>
                    <div className='relative w-[100px] h-[100px]'>
                      <Image
                        src={plant.plantImageUrl}
                        alt='plant'
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <p className='text-lg font-bold py-1'>{plant.name}</p>
                    <p className='text-sm'>{plant.description}</p>
                  </a>
                </Link>
              </PlantItem>
            );
          })}
        </PlantList>
      </div>
    </Layout>
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
  min-height: 220px;
  min-width: 145px;
  scroll-snap-align: start; /* latest (Chrome 69+) */
  scroll-snap-coordinate: 0% 0%; /* older (Firefox/IE) */
  -webkit-scroll-snap-coordinate: 0% 0%; /* older (Safari) */
  overflow: hidden;
`;
export default Recomand;
