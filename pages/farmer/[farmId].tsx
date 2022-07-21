import styled from '@emotion/styled';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import LogoHeader from '../../components/LogoHeader';
import { FruitType } from '../../types/FarmDetailType.interface';

interface ReservationType {
  _id: string;
  plantId?: string;
  userName?: string;
  hasNotification?: boolean;
  color: string;
  reserved: boolean;
}

const MyFarmDetail = () => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [fruitTypes, setFruitsTypes] = useState<FruitType[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const { farmId } = query;
    if (!farmId) return;
    axios
      .get(`/api/farmer/farm/${farmId}/reservation`)
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

  const goToFeeds = (plantId?: string) => {
    if (!plantId) {
      alert('해당 자리는 예약되지 않았습니다.');
      return;
    }
    router.push(`/farmer/plant/${plantId}`);
  };

  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          {reservations.length === 0 ? (
            <p>예약정보를 불러오지 못했습니다.</p>
          ) : (
            <ul className='grid w-[340px] grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] justify-items-center gap-2'>
              {reservations.map((reservation) => {
                console.log(reservation.hasNotification);
                return (
                  <ReservationItem
                    key={reservation['_id']}
                    bgColor={reservation.color}
                    onClick={() => goToFeeds(reservation.plantId)}
                  >
                    {'userName' in reservation && reservation.userName}
                  </ReservationItem>
                );
              })}
            </ul>
          )}
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='mb-2 font-bold'>품종 및 정보</h3>
          <ul className='relative grid w-full grid-cols-3 justify-items-center rounded-xl p-1'>
            {fruitTypes.map((fruitType) => {
              return (
                <li
                  className='flex cursor-pointer items-center gap-2'
                  key={fruitType['_id']}
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
              );
            })}
          </ul>
        </div>

        <div className='flex w-[300px] flex-col gap-2 self-center'>
          <button className='rounded-xl bg-primary px-8 py-3 text-lg text-white'>
            일괄 공지사항 남기기
          </button>
          <button className='rounded-xl bg-primary px-8 py-3 text-lg text-white'>
            선택항목 관리하기
          </button>
          <button className='rounded-xl bg-primary px-8 py-3 text-lg text-white'>
            전체항목 관리하기
          </button>
        </div>
      </div>
    </Layout>
  );
};

const ReservationItem = styled.li<{ bgColor: string }>`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;
export default MyFarmDetail;
