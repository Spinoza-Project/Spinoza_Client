import { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import dynamic from 'next/dynamic';
import { getGeoJSONDataBySGG, getGeoJSONDataByUMD } from '../../lib/utils';
import LogoHeader from '../../components/LogoHeader';

type RecomandType = 'planti' | 'produce';
const MapWithNoSSR = dynamic(() => import('../../components/leafletMap'), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});

const RecomandByPlant: NextPage = () => {
  const [geoJsonBySGG, setGoeJsonBySGG] = useState(null);
  const [geoJsonByUMD, setGoeJsonByUMD] = useState(null);
  const [recomandType, setRecomandType] = useState<RecomandType>('planti');
  const router = useRouter();

  useEffect(() => {
    // 시/군 GeoJSON 불러오기
    (async () => {
      try {
        const data = await getGeoJSONDataBySGG();
        setGoeJsonBySGG(data);
      } catch (e) {
        console.error(e);
      }
    })();

    // 읍/면/동 GeoJSON 불러오기
    (async () => {
      try {
        const data = await getGeoJSONDataByUMD();
        setGoeJsonByUMD(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRecomandType(e.target.value as RecomandType);
  };

  return (
    <>
      <Head>
        <title>어떤 농가를 추천받을까?</title>
      </Head>
      <Layout leftChild={<LogoHeader />}>
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
          <MapWithNoSSR
            recomandType={recomandType}
            geoJsonBySGG={geoJsonBySGG}
            geoJsonByUMD={geoJsonByUMD}
          />
        </div>
      </Layout>
    </>
  );
};

export default RecomandByPlant;
