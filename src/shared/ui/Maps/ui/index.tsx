import './index.scss';
import { ICoord } from '~/shared/lib/types/interfaces';
import { YMaps, Map, Placemark, RouteButton } from '@pbe/react-yandex-maps';

export default function Maps({ latitude, longitude }: ICoord) {
  return latitude && longitude && YMaps ? (
    <section className="map">
      <YMaps
        query={{
          apikey: import.meta.env.VITE_YAMAP_API_KEY,
          lang: 'ru_RU',
          ns: 'use-load-option',
          load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
        }}
      >
        <Map
          width={'100%'}
          height={'100%'}
          defaultState={{
            center: [latitude, longitude],
            zoom: 9,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
        >
          <Placemark
            defaultGeometry={[latitude, longitude]}
            properties={{
              balloonContentBody: 'За вами выехали.',
            }}
          />
          <RouteButton />
        </Map>
      </YMaps>
      ;
    </section>
  ) : (
    <div>Загружаю карту...</div>
  );
}
