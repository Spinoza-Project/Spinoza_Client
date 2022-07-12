import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
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
    <Layout leftChild={<LogoHeader />}>
      <div className='flex flex-col items-center gap-3 py-3'>
        <p>경상북도 영주시 풍기읍 전구리 232-1</p>
        <ul className='grid min-h-[472px] min-w-[360px] grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] rounded-3xl bg-[#6D3300] p-3'>
          {reservations.map((reservation, index) => {
            return (
              <li
                key={index}
                onClick={() => onSelectSeat(index)}
                className={`relative m-1 flex flex-col items-center justify-center rounded-3xl bg-gray-200 ${
                  selectedSeatIndex === index ? 'border-4 border-red-500' : ''
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
        <Link href={`/payment`}>
          <a className='flex h-[65px] w-[230px] items-center justify-center rounded-xl border-[1px] border-gray-400'>
            선택 완료
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Reservation;
