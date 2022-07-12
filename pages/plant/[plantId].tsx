import * as dayjs from 'dayjs';
import { NextPage } from 'next';
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

  return (
    <Layout>
      <div className='flex flex-col gap-5 py-3'>
        {!myPlantFeed ? (
          <p>로딩 중 입니다.</p>
        ) : (
          <>
            <div className='flex flex-col items-center'>
              <div className='flex h-[285px] min-w-[335px] flex-col items-center justify-between rounded-lg bg-primary'>
                <div className='relative h-full w-full rounded-lg border-[1px] border-gray-400'>
                  <Image
                    src={myPlantFeed.feeds[0].images[0]}
                    alt='lastest feed'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
                <p className='p-2 text-white'>{myPlantFeed.plantName}</p>
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

            <div className='flex flex-col items-center rounded-lg bg-primary'>
              <h3 className='py-2 text-white'>
                {myPlantFeed.plantName}의 성장 일지
              </h3>
              <ul className='flex w-full flex-col gap-5 rounded-lg bg-white'>
                {myPlantFeed.feeds.map((feed) => {
                  return (
                    <li key={feed.feedId}>
                      <p className='flex justify-center py-2'>
                        {dayjs(feed.createdAt).format('YYYY.MM.DD. hh:mm A')}
                      </p>
                      <div className='flex justify-between'>
                        <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                          <Image
                            src={feed.images[0]}
                            alt='feed image'
                            layout='fill'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </div>
                        <div className='flex flex-1 flex-col items-center gap-3 p-2'>
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
