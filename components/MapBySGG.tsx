import { FeatureType } from '../types';
import ReactDOMServer from 'react-dom/server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layer } from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import { EMPTY_COLOR, ROCOMAND_COLORS } from '../lib/utils';

interface PropsType {
  produce: any;
  geoJsonBySGG: any;
}
const MapBySGG: React.FC<PropsType> = ({ produce, geoJsonBySGG }) => {
  const router = useRouter();
  const { query } = router;

  const Popup = ({ feature }: { feature: FeatureType }) => {
    const {
      properties: { SGG_NM },
    } = feature;
    return (
      <div>
        <p>지역 : {SGG_NM}</p>
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
