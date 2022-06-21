import * as geojson from 'geojson';
import { LatLngExpression, Layer } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { getGeoJSONData, getProduct } from '../utils';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useRouter } from 'next/router';

const DEFAULT_CENTER = [36.4919, 128.8889] as LatLngExpression;

const PRODUCT_COLORS = ['#F1F6BA', '#E7BE75', '#D66F52', '#B85455'];
const EMPTY_COLOR = '#0ea5e9';

const LeafletMap = () => {
  const [getJSON, setGeoJSON] = useState(null);
  const [product, setProduct] = useState<{
    [key: string]: { [key: string]: number };
  }>();
  const router = useRouter();

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

  const onEachFeature = (
    feature: geojson.Feature<geojson.GeometryObject, any>,
    layer: Layer
  ) => {
    // console.log(feature);
    // console.log(layer);
    layer.on('click', (e) => {
      router.push(`/home`);
    });
  };

  const setStyle = (feature) => {
    if (!product) {
      return {
        weigth: 1,
      };
    }
    const {
      properties: { SGG_NM },
    } = feature;
    const { query } = router;
    return {
      fillColor: product.hasOwnProperty(SGG_NM)
        ? PRODUCT_COLORS[product[SGG_NM][query.name as string] - 1]
        : EMPTY_COLOR,
      fillOpacity: 0.8,
      color: '#000000',
      weigth: 0.1,
      opacity: 0.5,
    };
  };

  return (
    <div id='map' className='w-screen h-[50vh] relative'>
      <MapContainer center={DEFAULT_CENTER} scrollWheelZoom={true} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
