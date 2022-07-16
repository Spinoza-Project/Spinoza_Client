import { FeatureType } from '../types/common';
import { TourType } from '../types/TourType.interface';
import ReactDOMServer from 'react-dom/server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layer } from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import { EMPTY_COLOR, ROCOMAND_COLORS } from '../lib/utils';

interface PropsType {
  tourList: TourType[] | null;
  sugar: any;
  geoJsonByUMD: any;
  geoJsonBySGG: any;
}
const MapByUMD: React.FC<PropsType> = ({
  sugar,
  geoJsonByUMD,
  geoJsonBySGG,
}) => {
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

  const setStyleByUMD = (feature?: FeatureType) => {
    if (!sugar || !feature) {
      return {
        weigth: 1,
      };
    }
    const {
      properties: { EMD_NM },
    } = feature;

    return {
      fillColor: sugar.hasOwnProperty(EMD_NM)
        ? ROCOMAND_COLORS[sugar[EMD_NM] - 1]
        : EMPTY_COLOR,
      fillOpacity: 0.8,
      color: '#000000',
      weigth: 1,
      opacity: 0.1,
      //   stroke: false,
    };
  };

  const setStyleBySGG = (feature?: FeatureType) => {
    if (!feature) {
      return {
        weigth: 1,
      };
    }

    return {
      fillOpacity: 0,
      color: '#000000',
      weigth: 1,
      opacity: 0.5,
    };
  };
  return (
    <>
      <GeoJSON data={geoJsonByUMD} style={setStyleByUMD} />
      <GeoJSON
        data={geoJsonBySGG}
        onEachFeature={onEachFeature}
        style={setStyleBySGG}
      />
    </>
  );
};

export default MapByUMD;
