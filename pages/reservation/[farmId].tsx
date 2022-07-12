import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { ReservationType } from '../../types/ReservationType.interface';
import { getReservations } from '../api';

const Reservation: NextPage = () => {
  const [selectedSeatIndex, setSelectedSeatIndex] = useState<
    number | undefined
  >();
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!query) return;
    (async () => {
      try {
        const {
          data: { reservations },
        } = await getReservations(query.farmId as string);
        setReservations(reservations);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [query]);
  const onSelectSeat = (index: number) => {
    setSelectedSeatIndex(index);
  };

  if (reservations.length === 0) {
    return <div>예약정보를 불러오지 못했습니다.</div>;
  }
  return (
    <Layout>
      <div className='flex flex-col items-center gap-3 py-3'>
        <p>경상북도 영주시 풍기읍 전구리 232-1</p>
        <ul className='bg-[#6D3300] grid grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] min-w-[360px] min-h-[472px] rounded-3xl p-3'>
          {reservations.map((reservation, index) => {
            return (
              <li
                key={index}
                onClick={() => onSelectSeat(index)}
                className={`relative flex flex-col items-center justify-center m-1 bg-gray-200 rounded-3xl ${
                  selectedSeatIndex === index ? 'border-4 border-red-500' : ''
                }`}
              >
                <div className='relative w-4 h-4'>
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
        <Link href={`/payment`}>
          <a className='flex justify-center items-center border-[1px] border-gray-400 h-[65px] w-[230px] rounded-xl'>
            선택 완료
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Reservation;
