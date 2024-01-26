import React, { Suspense } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';

export default function WithYMapProvider(component: () => React.ReactNode | JSX.Element) {
  // eslint-disable-next-line react/display-name
  return () => (
    <YMaps
      query={{
        apikey: import.meta.env.VITE_YAMAP_API_KEY,
        lang: 'ru_RU',
        ns: 'use-load-option',
        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
      }}
    >
      <Suspense fallback="Loading Ymaps...">{component()}</Suspense>
    </YMaps>
  );
}
