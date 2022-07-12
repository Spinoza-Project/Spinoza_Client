import axios from 'axios';

const config = {
  next_redirect_pc_url: '',
  tid: '',
  params: {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: '초코파이',
    quantity: 1,
    total_amount: 2200,
    vat_amount: 200,
    tax_free_amount: 0,
    approval_url: 'http://localhost:3000/home',
    fail_url: 'http://localhost:3000/home',
    cancel_url: 'http://localhost:3000/home',
  },
};

const { params } = config;

export const postKakaoPay = async () => {
  return await axios.post('/v1/payment/ready', null, {
    params,
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
};
