import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layer } from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { FeatureType } from '../types/common';
import { TourType } from '../types/TourType.interface';
import { EMPTY_COLOR, ROCOMAND_COLORS } from '../lib/utils';

interface PropsType {
  tourList: TourType[] | null;
  produce: any;
  geoJsonBySGG: any;
}
const MapBySGG: React.FC<PropsType> = ({ tourList, produce, geoJsonBySGG }) => {
  const router = useRouter();
  const { query } = router;

  const Popup = ({ feature }: { feature: FeatureType }) => {
    const {
      properties: { SGG_NM },
    } = feature;
    return (
      <div className='flex flex-col items-center'>
        <h1 className='text-lg font-bold'>{SGG_NM}</h1>
        {!tourList && <p>여행지 정보를 불러오지 못했습니다.</p>}
        {tourList && tourList?.length === 0 ? (
          <p>여행지 정보가 없습니다.</p>
        ) : (
          <ul className='flex gap-2'>
            {tourList?.map((tour) => {
              return (
                <li key={tour['_id']} className='flex flex-col items-center'>
                  <div className='relative h-[60px] w-[60px] rounded-lg'>
                    {/* <Image
                      src={tour.tourImage}
                      alt='tour image'
                      layout='fill'
                      objectFit='cover'
                    /> */}
                    <img
                      src={tour.tourImage}
                      width={60}
                      height={60}
                      alt='tour image'
                      className='rounded-lg object-cover'
                    />
                  </div>
                  <span>{tour.tourName}</span>
                </li>
              );
            })}
          </ul>
        )}
        <Link href={`/farms?fruit=${query.name}&address=${SGG_NM}`}>
          <a>농가 구경하기👨‍🌾</a>
        </Link>
      </div>
    );
  };

  const onEachFeature = (feature: FeatureType, layer: Layer) => {
    const popupContent = ReactDOMServer.renderToString(
      <Popup feature={feature} />
    );
    layer.bindPopup(popupContent);
  };

  const setStyle = (feature?: FeatureType) => {
    if (!produce || !feature) {
      return {
        weigth: 1,
      };
    }
    const {
      properties: { SGG_NM },
    } = feature;

    return {
      fillColor: produce.hasOwnProperty(SGG_NM)
        ? ROCOMAND_COLORS[produce[SGG_NM][query.name as string] - 1]
        : EMPTY_COLOR,
      fillOpacity: 0.8,
      color: '#000000',
      weigth: 1,
      opacity: 0.5,
    };
  };
  return (
    <>
      <GeoJSON
        data={geoJsonBySGG}
        onEachFeature={onEachFeature}
        style={setStyle}
      />
    </>
  );
};

export default MapBySGG;
