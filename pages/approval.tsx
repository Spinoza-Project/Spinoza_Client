import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import LogoHeader from '../components/LogoHeader';

import { postReservation } from './api';

const Approval = () => {
  const initialConfig = {
    params: {
      cid: 'TC0ONETIME',
      tid: '',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      pg_token: '',
    },
  };
  const [config, setConfig] = useState(initialConfig);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const {
      query: { pg_token },
    } = router;
    if (!pg_token) return;

    setConfig((prev) => ({
      params: {
        ...prev.params,
        pg_token: pg_token as string,
        tid: localStorage.getItem('tid') as string,
      },
    }));
  }, [router]);

  useEffect(() => {
    const { params } = config;
    const reservationId = window.localStorage.getItem('reservationId');
    if (!params.tid || !params.pg_token) return;
    if (!reservationId) return;
    axios({
      url: '/v1/payment/approve',
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      (async () => {
        try {
          const {
            data: { data },
          } = await postReservation(reservationId, '로제이');
          console.log(data);
          if (data) {
            setIsSuccess(true);
            window.localStorage.removeItem('reservationId');
          }
        } catch (e) {
          setIsSuccess(false);
          console.log('예약 안되었으므로, 결제 취소해야함.');
          console.error(e);
        }
      })();
    });
  }, [config, router]);
  return (
    <Layout leftChild={<LogoHeader />}>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <h1 className='font-main text-lg'>
          {isSuccess
            ? '결제가 완료되었습니다.'
            : '결제에 실패했습니다. 처음부터 다시 시도해주세요.'}
        </h1>
        <Link href='/home' replace>
          <a>
            🏠 <span className='underline'>홈으로 돌아가기</span>
          </a>
        </Link>
      </div>
    </Layout>
  );
};
export default Approval;
