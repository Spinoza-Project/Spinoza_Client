import styled from '@emotion/styled';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { FarmInfoType } from '../../types/FarmInfoType.interface';
import { getFarms } from '../api';

const Farms: NextPage = () => {
  const [farms, setFamrs] = useState<FarmInfoType[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!query) return;
    const { fruit, address } = query as { fruit: string; address: string };

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
    <Layout>
      <div>
        {farms.length === 0 ? (
          <p>해당 지역에 농가가 없습니다.</p>
        ) : (
          <ul className='flex flex-col'>
            {farms.map((farm) => {
              return (
                <li key={farm.farmId} className='relative'>
                  <FarmImages className='p-4 w-full flex gap-3 snap-x snap-mandatory overflow-x-auto scroll-none'>
                    {farm.images.map((imageURL, index) => {
                      return (
                        <li key={index} className='snap-center snap-normal'>
                          <div className='z-10 relative w-[256px] h-[178px] drop-shadow-md'>
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
                    <a className='min-w-[80%] min-h-[158px] relative bottom-12 pt-16 px-4 pb-4 bg-gray-200 rounded-xl grid grid-rows-3 justify-items-center'>
                      <p>농가명 : {farm.farmName}</p>
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
