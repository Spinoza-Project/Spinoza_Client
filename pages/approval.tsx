import axios from 'axios';
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
          await postReservation(reservationId);
          console.log('새로운 작물 심었다!');
          window.localStorage.removeItem('reservationId');
          // router.replace('/home');
        } catch (e) {}
      })();
    });
  }, [config]);
  return <Layout leftChild={<LogoHeader />}>approval</Layout>;
};
export default Approval;
