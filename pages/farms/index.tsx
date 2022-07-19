import styled from '@emotion/styled';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import { FarmInfoType } from '../../types/FarmInfoType.interface';
import { getFarms } from '../api';

const Farms: NextPage = () => {
  const [farms, setFamrs] = useState<FarmInfoType[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!query) return;
    const { fruit, address } = query as { fruit: string; address: string };
    if (!fruit || !address) return;
    (async () => {
      try {
        const {
          data: { farms },
        } = await getFarms(fruit, address);
        setFamrs(farms);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [query]);
  return (
    <Layout leftChild={<LogoHeader />}>
      <div>
        {farms.length === 0 ? (
          <p>해당 지역에 농가가 없습니다.</p>
        ) : (
          <ul className='flex flex-col'>
            {farms.map((farm) => {
              return (
                <li key={farm.farmId} className='relative'>
                  <FarmImages className='scroll-none flex w-full snap-x snap-mandatory gap-3 overflow-x-auto p-4'>
                    {farm.images.map((imageURL, index) => {
                      return (
                        <li key={index} className='snap-center snap-normal'>
                          <div className='relative z-10 h-[178px] w-[256px] drop-shadow-md'>
                            <Image
                              src={imageURL}
                              alt='농가 이미지'
                              layout='fill'
                              objectFit='cover'
                              className='rounded-xl'
                            />
                          </div>
                        </li>
                      );
                    })}
                  </FarmImages>
                  <Link href={`/farms/${farm.farmId}`}>
                    <a className='relative bottom-12 flex min-h-[158px] min-w-[80%] flex-col gap-2 rounded-xl bg-gray-200 px-4 pt-16 pb-4 text-center'>
                      <p className='text-lg font-bold'>
                        농가명 : {farm.farmName}
                      </p>
                      <p>농가 주소 : {farm.address}</p>
                      <p>{farm.introduction}</p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
export default Farms;
