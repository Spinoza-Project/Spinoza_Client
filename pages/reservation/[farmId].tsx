import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import { ReservationType } from '../../types/ReservationType.interface';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { reservationId_atom, reservationPrice_atom } from '../../stores';
import { FruitType } from '../../types/FarmDetailType.interface';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../lib/fetcher';
import Modal from '../../components/Modal';

const Reservation: NextPage = () => {
  const [showFruitTypeDetail, setShowFruitTypeDetail] = useState({
    fruitTypeId: '',
  });
  const [reservationId, setReservationid] = useAtom(reservationId_atom);
  const setReservationPrice = useUpdateAtom(reservationPrice_atom);
  const router = useRouter();
  const { farmId } = router.query;
  const { data: reservationData, error } = useSWR<{
    reservations: ReservationType[];
    fruitTypes: FruitType[];
  }>(farmId ? `/api/user/farm/${farmId}/reservation` : null, fetcher);

  // useEffect(() => {
  //   const { farmId } = router.query;
  //   if (!farmId) return;
  //   axios
  //     .get(`/api/user/farm/${farmId}/reservation`)
  //     .then((res) => {
  //       const {
  //         data: {
  //           data: { reservations, fruitTypes },
  //         },
  //       } = res;
  //       setReservations(reservations);
  //       setFruitsTypes(fruitTypes);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [router]);

  const onSelectSeat = (
    reservationId: string,
    price: number,
    reserved: boolean
  ) => {
    if (reserved) {
      alert('이미 예약이 완료된 자리입니다.\n다른자리를 선택해주세요.');
      return;
    }
    setReservationid(reservationId);
    setReservationPrice(price);
  };

  const onClickPayment = () => {
    if (!reservationId) {
      alert('작물을 심을 자리를 선택해주세요.');
      return;
    }
    window.localStorage.setItem('reservationId', reservationId);
    router.push(`/payment`);
  };

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

  if (!reservationData) {
    return <div>예약정보를 불러오지 못했습니다.</div>;
  }
  const { reservations, fruitTypes } = reservationData;
  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex flex-col items-center gap-3 py-3'>
        <p>
          과수원에서의 위치{' '}
          <span className='cursor-pointer text-sm text-gray-400 underline'>
            사진보기
          </span>
        </p>
        <ul className='grid min-h-[472px] min-w-[360px] grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] rounded-3xl bg-[#6D3300] p-3'>
          {reservations.map((reservation) => {
            const id = reservation['_id'];
            return (
              <li
                key={id}
                onClick={() =>
                  onSelectSeat(id, reservation.price, reservation.reserved)
                }
                className={`relative m-1 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gray-200 ${
                  reservationId === id ? 'border-4 border-red-500' : ''
                }`}
              >
                {reservation.reserved && (
                  <div className='absolute z-[1] h-full w-full rounded-full bg-black opacity-50'></div>
                )}
                <div className='relative h-4 w-4'>
                  <Image
                    src={reservation.fruitType.image}
                    alt='fruitType'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-xl'
                  />
                </div>
                <span>{reservation.fruitType.name}</span>
              </li>
            );
          })}
        </ul>

        <ul className='relative grid w-full grid-cols-3 justify-items-center rounded-xl bg-gray-200 p-1'>
          {fruitTypes.map((fruitType) => {
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
                  className='absolute bottom-10 left-1/2 max-h-max w-[290px] -translate-x-1/2 select-none flex-col rounded-xl border border-black bg-white px-10 py-3 text-center shadow-2xl'
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
                    <span className='text-xl font-bold'>{fruitType.name}</span>
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

        <button
          onClick={onClickPayment}
          className='flex h-[60px] w-[230px] items-center justify-center rounded-xl border-[1px] border-gray-400'
        >
          선택 완료
        </button>
      </div>
    </Layout>
  );
};

export default Reservation;
