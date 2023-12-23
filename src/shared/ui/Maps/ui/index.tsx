import './index.scss';
import { ICoord } from '~/shared/lib/types/interfaces';
import { YMaps, Map, Placemark, RouteButton, SearchControl } from '@pbe/react-yandex-maps';

export default function Maps({ latitude, longitude }: ICoord) {
  console.log(latitude, longitude);

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
          state={{
            center: [latitude, longitude],
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl'],
          }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
        >
          <Placemark
            defaultGeometry={[latitude, longitude]}
            geometry={[latitude, longitude]}
            properties={{
              balloonContentBody: 'За вами выехали.',
            }}
          />
          <SearchControl
            options={{
              float: 'right',
              provider: 'yandex#search',
              boundedBy: [
                [latitude - 0.1, longitude - 0.1],
                [latitude + 0.1, longitude + 0.1],
              ], // Указывает приоритетный радиус поиска
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