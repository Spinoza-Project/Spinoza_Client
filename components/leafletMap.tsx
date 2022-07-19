import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { getProduct, getSugar } from '../lib/utils';
import MapByUMD from './MapByUMD';
import MapBySGG from './MapBySGG';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { TourType } from '../types/TourType.interface';

interface PropsType {
  tourList: TourType[] | null;
  recomandType: 'planti' | 'produce';
  geoJsonBySGG: any;
  geoJsonByUMD: any;
}
const DEFAULT_CENTER = [36.25, 128.7] as LatLngExpression;

const LeafletMap: React.FC<PropsType> = ({
  tourList,
  recomandType,
  geoJsonBySGG,
  geoJsonByUMD,
}) => {
  const [produce, setProduce] = useState<{
    [key: string]: { [key: string]: number };
  }>();
  const [sugar, setSugar] = useState<{
    [key: string]: number;
  }>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct();
        setProduce(data);
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

  return (
    <div id='map' className='h-full w-full'>
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
        {recomandType === 'planti' && geoJsonByUMD && geoJsonBySGG && sugar && (
          <MapByUMD
            geoJsonByUMD={geoJsonByUMD}
            geoJsonBySGG={geoJsonBySGG}
            sugar={sugar}
            tourList={tourList}
          />
        )}
        {recomandType === 'produce' && geoJsonBySGG && produce && (
          <MapBySGG
            geoJsonBySGG={geoJsonBySGG}
            produce={produce}
            tourList={tourList}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
