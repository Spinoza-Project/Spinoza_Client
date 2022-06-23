import { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import dynamic from 'next/dynamic';

type RecomandType = 'planti' | 'produce';
const MapWithNoSSR = dynamic(() => import('../../components/leafletMap'), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});

const RecomandByPlant: NextPage = () => {
  const [recomandType, setRecomandType] = useState<RecomandType>('planti');
  const router = useRouter();
  const { status } = useSession();

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRecomandType(e.target.value as RecomandType);
  };

  if (status === 'unauthenticated') {
    router.replace('/signin');
    return <div>로그인하세요.</div>;
  }
  return (
    <>
      <Head>
        <title>어떤 농가를 추천받을까?</title>
      </Head>
      <Layout>
        <form>
          <fieldset className='flex'>
            <div className='flex-1'>
              <label htmlFor='planti-recomand'>planti 추천</label>
              <input
                type='radio'
                id='planti-recomand'
                name='planti-recomand'
                value='planti'
                onChange={onChangeRadio}
                checked={recomandType === 'planti'}
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='produce-recomand'>생산량 추천</label>
              <input
                type='radio'
                id='produce-recomand'
                name='produce-recomand'
                value='produce'
                onChange={onChangeRadio}
                checked={recomandType === 'produce'}
              />
            </div>
          </fieldset>
        </form>
        <div className='overflow-hidden'>
          <MapWithNoSSR recomandType={recomandType} />
        </div>
      </Layout>
    </>
  );
};

export default RecomandByPlant;
