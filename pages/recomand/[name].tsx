import { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import dynamic from 'next/dynamic';
import { getGeoJSONDataBySGG, getGeoJSONDataByUMD } from '../../lib/utils';
import LogoHeader from '../../components/LogoHeader';
import { TourType } from '../../types/TourType.interface';
import { getTourList } from '../api';

type RecomandType = 'planti' | 'produce';
const MapWithNoSSR = dynamic(() => import('../../components/leafletMap'), {
  loading: () => <p>Map is loading</p>,
  ssr: false,
});

const RecomandByPlant: NextPage = () => {
  const [geoJsonBySGG, setGoeJsonBySGG] = useState(null);
  const [geoJsonByUMD, setGoeJsonByUMD] = useState(null);
  const [recomandType, setRecomandType] = useState<RecomandType>('planti');
  const [tourList, setTourList] = useState<TourType[] | null>([]);

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

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            data: { tours },
          },
        } = await getTourList();
        setTourList(tours);
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
        <div className='overflow-hidden'>
          <MapWithNoSSR
            tourList={tourList}
            recomandType={recomandType}
            geoJsonBySGG={geoJsonBySGG}
            geoJsonByUMD={geoJsonByUMD}
          />
        </div>
        <form>
          <fieldset className='flex'>
            <div className='flex flex-1 flex-col items-center'>
              <div className='rounded-full bg-primary px-3 py-1 text-white'>
                <label htmlFor='planti-recomand'>당도</label>
                <input
                  type='radio'
                  id='planti-recomand'
                  name='planti-recomand'
                  value='planti'
                  onChange={onChangeRadio}
                  checked={recomandType === 'planti'}
                  className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
                />
              </div>
              <span className='text-xs font-thin'>제일 맛있는 지역 추천</span>
            </div>
            <div className='flex flex-1 flex-col items-center'>
              <div className='rounded-full bg-primary px-3 py-1 text-white'>
                <label htmlFor='produce-recomand'>생산량</label>
                <input
                  type='radio'
                  id='produce-recomand'
                  name='produce-recomand'
                  value='produce'
                  onChange={onChangeRadio}
                  checked={recomandType === 'produce'}
                  className='form-check-input ml-2 cursor-pointer appearance-none border border-white bg-white bg-contain bg-center bg-no-repeat text-primary transition duration-200 checked:border-2 checked:border-white checked:bg-primary focus:border-primary focus:outline-none focus:ring-primary'
                />
              </div>
              <span className='text-xs font-thin'>
                제일 잘 자라는 지역 추천
              </span>
            </div>
          </fieldset>
        </form>
      </Layout>
    </>
  );
};

export default RecomandByPlant;
