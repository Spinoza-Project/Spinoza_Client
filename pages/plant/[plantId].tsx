import dayjs from 'dayjs';
import axios from 'axios';
import useSWR from 'swr';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import { PlantFeedType } from '../../types';
import Head from 'next/head';
import fetcher from '../../lib/fetcher';
import Modal from '../../components/Modal';

const PlantFeed: NextPage = () => {
  const [showFeedComments, setShowFeedComments] = useState<{
    [key: string]: boolean;
  }>({});
  const [comment, setComment] = useState('');
  const [showCommentInputModal, setShowCommentInputModal] = useState(false);
  const [feedId, setFeedId] = useState('');
  const router = useRouter();
  const {
    query: { plantId },
  } = router;
  const {
    data: plantFeedData,
    error,
    mutate: mutateFeedData,
  } = useSWR<PlantFeedType>(
    plantId ? `/api/farmer/plant/${plantId}/feed` : null,
    fetcher
  );

  const toggleComments = (feedId: string) => {
    setShowFeedComments((prev) => ({
      ...prev,
      [feedId]: feedId in prev ? !prev[feedId] : true,
    }));
  };

  const toggleCommentInputModal = (feedId: string) => {
    setShowCommentInputModal((prev) => !prev);
    setFeedId(feedId);
  };

  const onCloseModal = () => {
    setShowCommentInputModal(false);
  };

  const onSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment || !comment.trim()) {
      alert('댓글을 작성해주세요.');
      return;
    }
    if (!feedId || !plantId) {
      alert('유효하지 않은 요청입니다.');
      return;
    }

    axios
      .post(`/api/user/plant/${plantId}/feed/${feedId}/comment`, { comment })
      .then(() => {
        onCloseModal();
        mutateFeedData();
        setComment('');
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <Head>
        <title>내 농장 피드 관리하기</title>
      </Head>
      <Layout leftChild={<LogoHeader />}>
        <div className='flex w-full flex-col items-center gap-5 py-3'>
          {!plantFeedData ? (
            <p>로딩 중 입니다.</p>
          ) : (
            <>
              <div className='flex w-full max-w-[500px] flex-col items-center'>
                <div className='h-[285px] w-full flex-col rounded-lg bg-primary'>
                  <div
                    className={`relative h-[250px] w-full rounded-lg border-[1px] ${
                      plantFeedData.plantImage === 'default' &&
                      'border-gray-400 bg-white'
                    }`}
                  >
                    {plantFeedData.plantImage === 'default' ? (
                      <div className='m-auto flex h-full w-full items-center justify-center text-center'>
                        작물 사진을 피드로 올려주세요 ☺️
                      </div>
                    ) : (
                      <Image
                        src={plantFeedData.plantImage}
                        alt='썸네일'
                        layout='fill'
                        objectFit='cover'
                        className='rounded-lg'
                      />
                    )}
                  </div>
                </div>
                <span className='mt-2 max-w-[250px] text-center text-sm'>
                  {plantFeedData.farmName} / {plantFeedData.farmAddress}
                </span>
              </div>

              <div className='flex flex-col items-center'>
                <p>
                  기온 {plantFeedData.temperature}도 / {plantFeedData.weather} /
                  습도 {plantFeedData.humidity}%
                </p>
              </div>

              <div className='flex max-w-[250px] flex-col items-center'>
                <h3 className='text-center'>
                  피드를 남겨{' '}
                  <span className='bg-yellow-300'>
                    {plantFeedData.farmName}
                  </span>{' '}
                  농장주와 소통해보세요!
                </h3>
              </div>

              {plantFeedData.feeds.length !== 0 && (
                <div className='flex w-full max-w-[500px] flex-col items-center rounded-lg bg-primary'>
                  <h3 className='py-2 text-white'>
                    {plantFeedData.plantName}의 성장 일지
                  </h3>
                  <ul className='flex w-full flex-col items-center gap-8 bg-gray-200 py-4'>
                    {plantFeedData.feeds.map((feed) => {
                      return (
                        <li
                          key={feed.feedId}
                          className='w-full rounded-lg bg-white p-2 drop-shadow-md'
                        >
                          <p className='flex justify-center py-2'>
                            {dayjs(feed.createdAt).format(
                              'YYYY.MM.DD. A hh:mm'
                            )}{' '}
                            ({dayjs(feed.createdAt).fromNow()})
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
                              <span className='flex items-center justify-center text-xl font-bold'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-6 w-6'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
                                  />
                                </svg>
                                댓글
                              </span>
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
                                  className='flex items-center justify-center underline'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                                  </svg>
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
          <Modal
            show={showCommentInputModal}
            onCloseModal={onCloseModal}
            className='fixed top-[300px] max-h-max w-full max-w-[500px] select-none rounded-xl border border-black bg-white px-6 py-3 text-center shadow-2xl'
          >
            <form onSubmit={onSubmitComment}>
              <label>
                <span className='block w-full rounded-lg py-1 text-lg font-semibold'>
                  댓글 작성하기
                </span>
                <textarea
                  placeholder='댓글을 작성해주세요.'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='mt-2 w-full resize-none rounded-lg'
                />
                <button className='m-auto flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                  </svg>
                  댓글 등록
                </button>
              </label>
            </form>
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default PlantFeed;
