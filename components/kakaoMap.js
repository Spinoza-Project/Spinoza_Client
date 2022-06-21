import { useEffect, useState } from 'react';

const KaKaoMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        console.log('load');
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(36.4919, 128.8889), // 지도의 중심좌표
          level: 8, // 지도의 확대 레벨
        };
        setMap(new window.kakao.maps.Map(mapContainer, mapOption));
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);
  useEffect(() => {}, []);

  const onCurrentGeoLocation = () => {
    const displayMarker = (locPosition) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
      map.setCenter(locPosition);
      setMarker(marker);
    };

    const removeMarker = () => {
      marker.setMap(null);
    };

    if (marker !== null) {
      removeMarker();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        displayMarker(locPosition);
      });
    } else {
      alert('이 브라우저는 Geolocation을 지원하지 않습니다.');
      const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      displayMarker(locPosition);
    }
  };

  return (
    <div id='mapContainer' className='w-screen h-[40vh] relative'>
      <div id='map' className='w-full h-full z-0'></div>
      <div
        id='currentBtn'
        onClick={onCurrentGeoLocation}
        className='cursor-pointer	w-8 h-8 absolute top-1 left-1 z-10 bg-white'
      >
        cur
      </div>
    </div>
  );
};
export default KaKaoMap;
