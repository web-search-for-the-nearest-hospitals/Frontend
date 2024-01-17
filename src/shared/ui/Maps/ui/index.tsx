import styles from './index.module.scss';
import { IClinicListData, ICoord, IOrganization } from '~/shared/lib/types/interfaces';
import { YMaps, Map, Placemark, RouteButton, SearchControl } from '@pbe/react-yandex-maps';

interface IMaps extends ICoord {
  clinicData: IClinicListData | undefined;
  handleCardClick: (data: IOrganization) => void;
}

export default function Maps({ latitude, longitude, clinicData, handleCardClick }: IMaps) {
  return latitude && longitude && Map ? (
    <section className={styles['map']}>
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
              balloonContentBody: 'Центр мироздания. Возможно это вы.',
            }}
            options={{
              iconLayout: 'default#image',
              iconImageHref: '/src/shared/assets/icons/location.svg',
            }}
          />

          {clinicData?.results.map((el) => (
            <Placemark
              key={`${el.latitude}${el.longitude}`}
              defaultGeometry={[el.latitude, el.longitude]}
              geometry={[el.latitude, el.longitude]}
              onClick={() => handleCardClick(el)}
            />
          ))}

          <SearchControl
            options={{
              float: 'right',
              provider: 'yandex#search', // позволяет использовать стики "где поесть"
              boundedBy: [
                [latitude - 0.1, longitude - 0.1],
                [latitude + 0.1, longitude + 0.1],
              ], // Указывает приоритетный радиус поиска
            }}
          />
          <RouteButton />
        </Map>
      </YMaps>
    </section>
  ) : (
    <div>Жду координаты или уже пытаюсь загрузить</div>
  );
}
