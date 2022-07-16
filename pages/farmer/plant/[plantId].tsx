import * as dayjs from 'dayjs';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import LogoHeader from '../../../components/LogoHeader';
import { PlantFeedType } from '../../../types';

const PlantFeed = () => {
  const [plantFeed, setPlantFeed] = useState<PlantFeedType>();
  const [showFeedComments, setShowFeedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [showCommentInputModal, setShowCommentInputModal] = useState(false);

  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    const { plantId } = query;
    if (!plantId) {
      return;
    }
    axios
      .get(`/api/farmer/plant/${plantId}/feed`)
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPlantFeed(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query]);

  const toggleComments = (feedId: string) => {
    setShowFeedComments((prev) => ({
      ...prev,
      [feedId]: feedId in prev ? !prev[feedId] : true,
    }));
  };

  const toggleCommentInputModal = (feedId: string) => {
    setShowCommentInputModal((prev) => !prev);
  };

  const onCloseModal = () => {
    setShowCommentInputModal(false);
  };

  const writeFeed = () => {
    const { plantId } = query;
    if (!plantId) {
      return;
    }
    router.push(`/farmer/write?plantId=${plantId}`);
  };
  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex w-full flex-col items-center gap-5 py-3'>
        {!plantFeed ? (
          <p>로딩 중 입니다.</p>
        ) : (
          <>
            <div className='flex w-full max-w-[500px] flex-col items-center'>
              <h3>
                {plantFeed.userName} / {plantFeed.plantName}
              </h3>
              <div className='h-[285px] w-full flex-col rounded-lg bg-primary'>
                <div
                  className={`relative h-[250px] w-full rounded-lg border-[1px] ${
                    !plantFeed.plantImage && 'border-gray-400 bg-white'
                  }`}
                >
                  {plantFeed.plantImage ? (
                    <Image
                      src={plantFeed.plantImage}
                      alt='썸네일'
                      layout='fill'
                      objectFit='cover'
                      className='rounded-lg'
                    />
                  ) : (
                    <div className='m-auto flex h-full w-full items-center justify-center text-center'>
                      작물 사진을 피드를 통해 올려주세요 ☺️
                    </div>
                  )}
                </div>
              </div>
              <span className='max-w-[250px] text-center text-sm'>
                {plantFeed.farmName} / {plantFeed.farmAddress}
              </span>
            </div>

            <div className='flex flex-col items-center'>
              <p>
                기온 {plantFeed.temperature}도 / {plantFeed.weather} / 습도{' '}
                {plantFeed.humidity}%
              </p>
            </div>

            <div className='flex w-[250px] flex-col items-center'>
              <h3>피드를 남겨 농장주와 소통해보세요!</h3>
              <button
                type='button'
                onClick={writeFeed}
                className='w-full rounded-xl bg-primary px-6 py-2 text-lg text-white'
              >
                피드 추가하기
              </button>
            </div>

            {plantFeed.feeds.length !== 0 && (
              <div className='flex w-full max-w-[500px] flex-col items-center rounded-lg bg-primary'>
                <h3 className='py-2 text-white'>
                  {plantFeed.plantName}의 성장 일지
                </h3>
                <ul className='flex w-full flex-col items-center gap-8 bg-gray-200 py-4'>
                  {plantFeed.feeds.map((feed) => {
                    return (
                      <li
                        key={feed.feedId}
                        className='rounded-lg bg-white p-2 drop-shadow-md'
                      >
                        <p className='flex justify-center py-2'>
                          {dayjs(feed.createdAt).format('YYYY.MM.DD. hh:mm A')}
                        </p>
                        <div className='flex justify-between gap-2'>
                          <div className='relative h-[250px] w-[180px] rounded-lg border-[1px] border-gray-400'>
                            <Image
                              src={feed.images[0]}
                              alt='feed image'
                              layout='fill'
                              objectFit='cover'
                              className='rounded-lg'
                            />
                          </div>
                          <div className='flex flex-1 flex-col items-center gap-3'>
                            <h3 className='font-bold'>과수원의 한마디</h3>
                            <p>{feed.content}</p>
                          </div>
                        </div>
                        <div className='mt-2'>
                          <div className='flex justify-between'>
                            <span className='text-xl font-bold'>댓글</span>
                            <button
                              className='text-gray-400'
                              onClick={() => toggleComments(feed.feedId)}
                            >
                              {showFeedComments[feed.feedId]
                                ? '닫기'
                                : '펼치기'}
                            </button>
                          </div>
                          {showFeedComments[feed.feedId] && (
                            <ul>
                              {feed.comments.map((comment, index) => {
                                return (
                                  <li key={index}>
                                    <div className='flex items-center gap-2'>
                                      <Image
                                        src={comment.profileImage}
                                        alt='profile'
                                        width={20}
                                        height={20}
                                      />
                                      <span>{comment.userName}</span>
                                    </div>
                                    <p className='pl-6'>{comment.comment}</p>
                                  </li>
                                );
                              })}
                              <button
                                onClick={() =>
                                  toggleCommentInputModal(feed.feedId)
                                }
                                className='underline'
                              >
                                댓글 남기기
                              </button>
                            </ul>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default PlantFeed;
