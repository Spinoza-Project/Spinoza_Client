import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Layout from '../components/layout';
import ReceiveRadio from '../components/ReceiveRadio';
// import { postKakaoPay } from './api/kakaoPay';

type ReceiveType = 'parcel' | 'direct' | 'pickup';
type PaymentType = 'simple' | 'card' | 'noBankbook';

const Payment: NextPage = () => {
  const initialConfig = {
    next_redirect_pc_url: '',
    tid: '',
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '자기 나무 심기',
      quantity: 1,
      total_amount: 26000,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: 'http://localhost:3000/home',
      fail_url: 'http://localhost:3000/home',
      cancel_url: 'http://localhost:3000/home',
    },
  };
  const [config, setConfig] = useState(initialConfig);
  const [weight, setWeight] = useState('');
  const [donateWeight, setDonateWeight] = useState('');
  const [receive, setReceive] = useState<ReceiveType>('parcel');
  const [payment, setPayment] = useState<PaymentType>('simple');
  const [isDonated, setIsDonated] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(weight);
  //   setConfig((prev) => {
  //     return {
  //       ...prev,
  //       params: {
  //         ...prev.params,
  //         total_amount: Number(weight) * 4000 + 6000,
  //       },
  //     };
  //   });
  // }, [weight]);

  useEffect(() => {
    const { params } = config;
    axios({
      url: '/v1/payment/ready',
      method: 'POST',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    })
      .then((response) => {
        // 응답에서 필요한 data만 뽑는다.
        const {
          data: { next_redirect_pc_url, tid },
        } = response;

        window.localStorage.setItem('tid', tid);
        // 응답 data로 state 갱신
        setConfig({ next_redirect_pc_url, tid });
      })
      .catch((error) => {});
  }, [config]);

  const onClickIsDonate = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDonated(!isDonated);
  };
  const onChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setWeight(value);
    setDonateWeight(40 - Number(value));
  };
  const onChangeDonation = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDonateWeight(value);
  };
  const onChangeReceive = (e: ChangeEvent<HTMLInputElement>) => {
    setReceive(e.target.value as ReceiveType);
  };
  const onChangePayment = (e: ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value as PaymentType);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className='flex flex-col w-full gap-3 py-4'>
        <div className='flex flex-col w-full'>
          <h3 className='font-bold text-lg'>
            열매 관리
            <br />
            <span className='font-normal text-sm'>
              수확 후 챙겨갈 열매량을 입력하세요.
            </span>
          </h3>
          <div className='flex flex-col items-center'>
            <div className='w-[90%] flex justify-between text-white bg-primary p-4 rounded-2xl'>
              <div className='w-24'>
                {'['}
                <input
                  type='text'
                  name='weight'
                  value={weight}
                  onChange={onChangeWeight}
                  className='w-10 rounded-xl text-black'
                />
                {'] kg'}
              </div>
              <span className='flex-1'>{Number(weight) * 4000} 원</span>
            </div>
            <span className='font-normal text-sm'>
              최대 40kg까지 입력 가능합니다.
            </span>
          </div>
        </div>

        <div>
          <h3 className='font-bold text-lg'>초과 수확 열매 관리</h3>
          <span className='font-normal text-sm'>
            초과 수확 및 40kg 이하 설정 열매를 관리합니다
          </span>
        </div>

        <div className='flex justify-center gap-4'>
          <button
            className={`border-[1px] border-black rounded-xl p-2 ${
              isDonated ? 'bg-gray-200' : 'bg-white'
            }`}
            onClick={() => setIsDonated(true)}
          >
            기부하기
          </button>
          <button
            className={`border-[1px] border-black rounded-xl p-2 ${
              isDonated ? 'bg-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsDonated(false)}
          >
            과수원에 드리기
          </button>
        </div>

        <div className='flex justify-center'>
          {isDonated && (
            <div className='flex justify-between w-[90%] text-white bg-primary p-4 rounded-2xl'>
              <div className='w-24'>
                {'['}
                <input
                  type='text'
                  name='donateWeight'
                  value={donateWeight}
                  onChange={onChangeDonation}
                  className='w-10 rounded-xl text-black'
                />
                {'] kg'}
              </div>
              <span className='flex-1'>한국사회복지협회에 기부하기</span>
            </div>
          )}
        </div>

        <div className='flex flex-col items-center'>
          <h3 className='font-bold text-lg p-2 border-black border-[1px] rounded-xl'>
            총 금액 : <span>{Number(weight) * 4000 + 6000} 원</span>
          </h3>
          <span className='font-normal text-sm'>
            최소 주문비 및 배송비 6000원 포함
          </span>
        </div>

        <div className='flex flex-col items-center w-full'>
          <h3 className='font-bold text-lg'>결제 정보 입력</h3>
          <form
            onSubmit={onSubmit}
            className='w-full flex flex-col items-center gap-2'
          >
            <div className='w-[90%] flex justify-between items-center px-3 py-2 rounded-xl border-[1px] border-black drop-shadow-md'>
              <label htmlFor='name'>수령자 이름</label>
              <input
                id='name'
                type='text'
                placeholder='이름'
                required
                className='bg-gray-200 rounded-lg p-1'
              />
            </div>
            <div className='w-[90%] flex justify-between items-center px-3 py-2 rounded-xl border-[1px] border-black drop-shadow-md'>
              <label htmlFor='phoneNumber'>전화번호</label>
              <input
                id='phoneNumber'
                type='text'
                placeholder='전화번호'
                required
                className='bg-gray-200 rounded-lg p-1'
              />
            </div>
            <div className='w-[90%] flex justify-between items-center px-3 py-2 rounded-xl border-[1px] border-black drop-shadow-md'>
              <label htmlFor='destination'>배송지</label>
              <input
                id='destination'
                type='text'
                placeholder='배송지'
                required
                className='bg-gray-200 rounded-lg p-1'
              />
            </div>
            <div className='w-[90%] flex justify-between items-center px-3 py-2 rounded-xl border-[1px] border-black drop-shadow-md'>
              <label htmlFor='requirement'>추가 요청 사항</label>
              <input
                id='requirement'
                type='text'
                placeholder='추가 요청 사항'
                className='bg-gray-200 rounded-lg p-1'
              />
            </div>
            <div className='w-full flex justify-between gap-4'>
              <div className='flex flex-1 flex-col gap-2'>
                <ReceiveRadio
                  label='택배 수령'
                  value='parcel'
                  receive={receive}
                  onChangeReceive={onChangeReceive}
                />
                <ReceiveRadio
                  label='직접 수확'
                  value='direct'
                  receive={receive}
                  onChangeReceive={onChangeReceive}
                />
                <ReceiveRadio
                  label='픽업'
                  value='pickup'
                  receive={receive}
                  onChangeReceive={onChangeReceive}
                />
              </div>
              <div className='w-full flex flex-1 flex-col gap-2'>
                <div className='flex flex-1 items-center justify-between py-3 px-8 bg-gray-200 rounded-xl drop-shadow-md'>
                  <label htmlFor='simple' className='flex-1'>
                    간편결제
                  </label>
                  <input
                    type='radio'
                    id='simple'
                    name='simple'
                    value='simple'
                    onChange={onChangePayment}
                    checked={payment === 'simple'}
                  />
                </div>
                <div className='flex flex-1 items-center justify-between py-3 px-8 bg-gray-200 rounded-xl drop-shadow-md'>
                  <label htmlFor='card' className='flex-1'>
                    카드
                  </label>
                  <input
                    type='radio'
                    id='card'
                    name='card'
                    value='card'
                    onChange={onChangePayment}
                    checked={payment === 'card'}
                  />
                </div>
                <div className='flex flex-1 items-center justify-between py-3 px-8 bg-gray-200 rounded-xl drop-shadow-md'>
                  <label htmlFor='noBankbook' className='flex-1'>
                    무통장입금
                  </label>
                  <input
                    type='radio'
                    id='noBankbook'
                    name='noBankbook'
                    value='noBankbook'
                    onChange={onChangePayment}
                    checked={payment === 'noBankbook'}
                  />
                </div>
              </div>
            </div>
            <a
              href={config.next_redirect_pc_url}
              className='flex justify-center items-center bg-primary w-[200px] h-[40px] rounded-xl text-white'
            >
              결제
            </a>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
