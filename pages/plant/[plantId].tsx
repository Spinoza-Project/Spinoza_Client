import * as dayjs from 'dayjs';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { MyPlantFeedType } from '../../types/FeedType.interface';
import { getPlantFeed } from '../api';

const PlantFeed: NextPage = () => {
  const [myPlantFeed, setMyPlantFeed] = useState<MyPlantFeedType>();
  const router = useRouter();
  const { plantId } = router.query;
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPlantFeed(plantId as string);
        setMyPlantFeed(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [plantId]);

  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }

  return (
    <Layout>
      <div className='flex flex-col gap-5 py-3'>
        {!myPlantFeed ? (
          <p>로딩 중 입니다.</p>
        ) : (
          <>
            <div className='flex flex-col items-center'>
              <div className='bg-primary flex flex-col items-center rounded-lg min-w-[335px] h-[285px] justify-between'>
                <div className='relative w-full h-full border-[1px] border-gray-400 rounded-lg'>
                  <Image
                    src={myPlantFeed.feeds[0].images[0]}
                    alt='lastest feed'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
                <p className='text-white p-2'>{myPlantFeed.plantName}</p>
              </div>

              <span className='text-sm'>
                {myPlantFeed.farmName} / {myPlantFeed.farmAddress}
              </span>
            </div>

            <div className='flex flex-col items-center'>
              <p>
                {myPlantFeed.temperature} / {myPlantFeed.weather} /{' '}
                {myPlantFeed.humidity}
              </p>
            </div>

            <div className='flex flex-col items-center bg-primary rounded-lg'>
              <h3 className='py-2 text-white'>
                {myPlantFeed.plantName}의 성장 일지
              </h3>
              <ul className='flex flex-col gap-5 bg-white w-full rounded-lg'>
                {myPlantFeed.feeds.map((feed) => {
                  return (
                    <li key={feed.feedId}>
                      <p className='flex justify-center py-2'>
                        {dayjs(feed.createdAt).format('YYYY.MM.DD. hh:mm A')}
                      </p>
                      <div className='flex'>
                        <div className='relative w-[180px] h-[250px] border-[1px] border-gray-400 rounded-lg'>
                          <Image
                            src={feed.images[0]}
                            alt='feed image'
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </div>
                        <div className='p-2 flex flex-col items-center gap-3'>
                          <h3 className='font-bold'>과수원의 한마디</h3>
                          <p>{feed.content}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PlantFeed;
