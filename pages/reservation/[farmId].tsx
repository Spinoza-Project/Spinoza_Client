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

const Reservation: NextPage = () => {
  const [reservationId, setReservationid] = useAtom(reservationId_atom);
  const setReservationPrice = useUpdateAtom(reservationPrice_atom);
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [fruitTypes, setFruitsTypes] = useState<FruitType[]>([]);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const { farmId } = query;
    if (!farmId) return;
    axios
      .get(`/api/user/farm/${farmId}/reservation`)
      .then((res) => {
        const {
          data: {
            data: { reservations, fruitTypes },
          },
        } = res;
        setReservations(reservations);
        setFruitsTypes(fruitTypes);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [query]);

  const onSelectSeat = (reservationId: string, price: number) => {
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

  if (reservations.length === 0) {
    return <div>예약정보를 불러오지 못했습니다.</div>;
  }
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
                key={reservation['_id']}
                onClick={() => onSelectSeat(id, reservation.price)}
                className={`relative m-1 flex flex-col items-center justify-center rounded-3xl bg-gray-200 ${
                  reservationId === id ? 'border-4 border-red-500' : ''
                }`}
              >
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
        <button
          onClick={onClickPayment}
          className='flex h-[65px] w-[230px] items-center justify-center rounded-xl border-[1px] border-gray-400'
        >
          선택 완료
        </button>
      </div>
    </Layout>
  );
};

export default Reservation;
