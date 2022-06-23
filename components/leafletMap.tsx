import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as geojson from 'geojson';
import { LatLngExpression, Layer } from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { getGeoJSONData, getProduct, getSugar } from '../utils';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

type FeatureType = geojson.Feature<geojson.GeometryObject, any>;
interface PropsType {
  recomandType: 'planti' | 'produce';
}
const DEFAULT_CENTER = [36.4919, 128.8889] as LatLngExpression;

const ROCOMAND_COLORS = ['#F1F6BA', '#E7BE75', '#D66F52', '#B85455'];
const EMPTY_COLOR = '#0ea5e9';

const LeafletMap: React.FC<PropsType> = ({ recomandType }) => {
  const [getJSON, setGeoJSON] = useState(null);
  const [product, setProduct] = useState<{
    [key: string]: { [key: string]: number };
  }>();
  const [sugar, setSugar] = useState<{
    [key: string]: number;
  }>();

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    (async () => {
      try {
        const data = await getGeoJSONData();
        setGeoJSON(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSugar();
        setSugar(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
    if (!sugar || !product || !feature) {
      return {
        weigth: 1,
      };
    }
    const {
      properties: { SGG_NM },
    } = feature;

    if (recomandType === 'planti') {
      return {
        fillColor: sugar.hasOwnProperty(SGG_NM)
          ? ROCOMAND_COLORS[sugar[SGG_NM] - 1]
          : EMPTY_COLOR,
        fillOpacity: 0.8,
        color: '#000000',
        weigth: 1,
        opacity: 0.5,
      };
    } else if (recomandType === 'produce') {
      return {
        fillColor: product.hasOwnProperty(SGG_NM)
          ? ROCOMAND_COLORS[product[SGG_NM][query.name as string] - 1]
          : EMPTY_COLOR,
        fillOpacity: 0.8,
        color: '#000000',
        weigth: 1,
        opacity: 0.5,
      };
    }
  };

  return (
    <div id='map' className='w-screen h-[50vh]'>
      <MapContainer
        center={DEFAULT_CENTER}
        scrollWheelZoom={true}
        zoom={8}
        className='z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {getJSON && (
          <GeoJSON
            data={getJSON}
            onEachFeature={onEachFeature}
            style={setStyle}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
