import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Layout from '../components/layout';
import LogoHeader from '../components/LogoHeader';
import InputRadio from '../components/InputRadio';
import Modal from '../components/Modal';
import { initialConfig } from '../lib/kakaoPayConfig';

import { useAtomValue } from 'jotai/utils';
import { reservationPrice_atom } from '../stores';
import { useRouter } from 'next/router';

type ReceiveType = 'parcel' | 'direct' | 'pickup';
type PaymentType = 'simple' | 'card' | 'noBankbook';
const DONATE_PLACE_LIST = ['전국푸드뱅크', '한국사회복지협회', '기타'];
const PARCEL_PRICE = 6000;

const Payment: NextPage = () => {
  const [config, setConfig] = useState(initialConfig);

  const [weight, setWeight] = useState('');
  const [donateWeight, setDonateWeight] = useState('');

  const [receive, setReceive] = useState<ReceiveType>('parcel');
  const [payment, setPayment] = useState<PaymentType>('simple');

  const [isDonated, setIsDonated] = useState(true);
  const [donatePlace, setDonatePlace] = useState('');
  const [showDonatePlaceModal, setShowDonatePlaceModal] = useState(false);
  const reservationPrice = useAtomValue(reservationPrice_atom);
  const router = useRouter();

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      params: {
        ...prev.params,
        total_amount: PARCEL_PRICE,
      },
    }));
  }, []);

  const toggleDonateModal = () => {
    setShowDonatePlaceModal((prev) => !prev);
    setIsDonated(true);
  };
  const onCloseModal = () => {
    setShowDonatePlaceModal(false);
  };
  const onChangeDonatePlace = (e: ChangeEvent<HTMLInputElement>) => {
    setDonatePlace(e.target.value);
  };

  const onChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const validatedWeight = value.replace(/[^0-9]/g, '');
    if (+validatedWeight < 0 || +validatedWeight > 40) {
      alert('0kg 이상 40kg 이하만 적어주세요.');
      return;
    }
    setConfig((prev) => ({
      ...prev,
      params: {
        ...prev.params,
        total_amount: Number(validatedWeight) * reservationPrice + 6000,
      },
    }));
    setWeight(validatedWeight);
    setDonateWeight(String(40 - +validatedWeight));
  };

  const onChangeDonation = (e: ChangeEvent<HTMLInputElement>) => {
    setDonateWeight(e.target.value);
  };

  const onChangeReceive = (e: ChangeEvent<HTMLInputElement>) => {
    setReceive(e.target.value as ReceiveType);
  };

  const onChangePayment = (e: ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value as PaymentType);
  };

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();

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
        const {
          data: { next_redirect_pc_url, next_redirect_mobile_url, tid },
        } = response;

        window.localStorage.setItem('tid', tid);
        setConfig((prev) => ({
          ...prev,
          next_redirect_pc_url,
          next_redirect_mobile_url,
          tid,
        }));
        router.push(next_redirect_pc_url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Head>
        <title>Planti 결제하기</title>
      </Head>
      <Layout leftChild={<LogoHeader />}>
        <form className='flex w-full flex-col gap-3 py-4'>
          <div className='flex flex-col items-center gap-4'>
            <label htmlFor='weight'>
              <h2 className='flex justify-center rounded-2xl p-3 text-lg font-bold shadow-md'>
                열매 관리
              </h2>
              <div className='mt-1 text-sm'>
                수확 후 챙겨갈 열매량을 입력하세요.
              </div>
            </label>
            <div className='flex w-full flex-col'>
              <div className='flex w-full items-center gap-2 rounded-3xl bg-primary p-3 text-center'>
                <div className='rounded-full bg-white px-4'>
                  {'['}
                  <input
                    type='text'
                    name='weight'
                    id='weight'
                    required
                    value={weight}
                    onChange={onChangeWeight}
                    className='w-12 border-none focus:ring-0'
                  />
                  {'] kg'}
                </div>
                <span className='flex-1 text-xl font-semibold text-white'>
                  {Number(weight) * reservationPrice} 원
                </span>
              </div>
              <span className='text-sm'>최대 40kg까지 입력 가능합니다.</span>
            </div>
          </div>

          <div className='mt-4 flex flex-col items-center gap-4'>
            <label htmlFor='donateWeight'>
              <h2 className='flex justify-center rounded-2xl p-3 text-lg font-bold shadow-md'>
                초과 수확 열매 관리
              </h2>
              <div className='mt-1 text-sm'>
                초과 수확 및 40kg 이하 설정 열매를 관리합니다.
              </div>
            </label>
            <div className='flex justify-center gap-4'>
              <button
                type='button'
                onClick={toggleDonateModal}
                className='rounded-xl border-[1px] border-black p-2'
              >
                {isDonated && '❤️'} 기부하기
              </button>
              <button
                type='button'
                onClick={() => setIsDonated(false)}
                className='rounded-xl border-[1px] border-black p-2'
              >
                {!isDonated && '❤️'} 과수원에 드리기
              </button>
            </div>
            <div className='flex w-full items-center gap-2 rounded-3xl bg-primary p-3 text-center'>
              <div className='rounded-full bg-white px-4'>
                {'['}
                <input
                  type='text'
                  name='donateWeight'
                  id='donateWeight'
                  required
                  value={donateWeight}
                  onChange={onChangeDonation}
                  className='w-12 border-none focus:ring-0'
                />
                {'] kg'}
              </div>
              <span className='flex-1 text-lg font-semibold text-white'>
                {isDonated ? (
                  donatePlace ? (
                    <>
                      {donatePlace === '기타'
                        ? '"추가 요청 사항"에 기부할 장소를 적어주세요!'
                        : `(${donatePlace})에 기부하기`}
                    </>
                  ) : (
                    <>
                      {'"기부하기" 버튼을 클릭한 후, 기부할 곳을 선택해주세요.'}
                    </>
                  )
                ) : (
                  <>과수원에 드리기</>
                )}
              </span>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <div className='flex justify-center rounded-2xl p-3 font-bold shadow-md'>
              총 금액 : {Number(weight) * reservationPrice + 6000} 원
            </div>
            <div className='mt-1 text-sm'>
              최소 주문비 및 배송비 6000원 포함
            </div>
          </div>

          <div className='mt-4 flex flex-col items-center gap-2'>
            <h2 className='flex justify-center rounded-2xl p-3 font-bold shadow-md'>
              결제 정보 입력
            </h2>
            <label
              htmlFor='name'
              className='flex w-9/12 items-center justify-between rounded-xl border-[1px] border-black px-3 py-2 drop-shadow-md'
            >
              <span>수령자 이름</span>
              <input
                id='name'
                type='text'
                placeholder='이름'
                required
                className='rounded-lg border-none bg-gray-200 p-1'
              />
            </label>
            <label
              htmlFor='phoneNumber'
              className='flex w-9/12 items-center justify-between rounded-xl border-[1px] border-black px-3 py-2 drop-shadow-md'
            >
              <span>전화번호</span>
              <input
                id='phoneNumber'
                type='text'
                placeholder='전화번호'
                required
                className='rounded-lg border-none bg-gray-200 p-1'
              />
            </label>
            <label
              htmlFor='destination'
              className='flex w-9/12 items-center justify-between rounded-xl border-[1px] border-black px-3 py-2 drop-shadow-md'
            >
              <span>배송지</span>
              <input
                id='destination'
                type='text'
                placeholder='배송지'
                required
                className='rounded-lg border-none bg-gray-200 p-1'
              />
            </label>
            <label
              htmlFor='requirement'
              className='flex w-9/12 items-center justify-between rounded-xl border-[1px] border-black px-3 py-2 drop-shadow-md'
            >
              <span>추가 요청 사항</span>
              <input
                id='requirement'
                type='text'
                placeholder='추가 요청 사항'
                className='rounded-lg border-none bg-gray-200 p-1'
              />
            </label>
          </div>

          <div className='mt-4 flex justify-center gap-4'>
            <fieldset className='flex w-full flex-1 flex-col gap-2'>
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
                <label htmlFor='parcel' className='flex-1'>
                  택배 수령
                </label>
                <input
                  type='radio'
                  id='parcel'
                  name='parcel'
                  value='parcel'
                  onChange={onChangeReceive}
                  checked={receive === 'parcel'}
                />
              </div>
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
                <label htmlFor='direct' className='flex-1'>
                  직접 수확
                </label>
                <input
                  type='radio'
                  id='direct'
                  name='direct'
                  value='direct'
                  onChange={onChangeReceive}
                  checked={receive === 'direct'}
                />
              </div>
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
                <label htmlFor='pickup' className='flex-1'>
                  픽업
                </label>
                <input
                  type='radio'
                  id='pickup'
                  name='pickup'
                  value='pickup'
                  onChange={onChangeReceive}
                  checked={receive === 'pickup'}
                />
              </div>
            </fieldset>
            <fieldset className='flex w-full flex-1 flex-col gap-2'>
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
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
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
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
              <div className='flex flex-1 items-center justify-between rounded-xl bg-gray-200 py-3 px-8 drop-shadow-md'>
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
            </fieldset>
          </div>
          <button
            type='submit'
            onClick={handlePayment}
            className='flex h-[40px] w-9/12 items-center justify-center self-center rounded-xl bg-primary text-white'
          >
            결제하기
          </button>
        </form>
        <Modal
          show={showDonatePlaceModal}
          onCloseModal={onCloseModal}
          className='fixed top-1/2 left-1/2 max-h-max w-[290px] -translate-x-1/2 -translate-y-1/2 select-none rounded-xl border border-black bg-white px-10 py-3 text-center shadow-2xl'
        >
          <div className='flex flex-col items-center gap-2'>
            {DONATE_PLACE_LIST.map((place, index) => {
              return (
                <InputRadio
                  key={index}
                  value={place}
                  donatePlace={donatePlace}
                  onChange={onChangeDonatePlace}
                />
              );
            })}
            <button
              onClick={onCloseModal}
              className='mt-2 flex items-center justify-center rounded-xl border border-gray-400 px-3 py-1'
            >
              선택완료
            </button>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default Payment;
