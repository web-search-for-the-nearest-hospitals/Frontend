import styles from './index.module.scss';
import { IClinicListData, ICoord, IOrganization } from '~/shared/lib/types/interfaces';
import { Map, Placemark, RouteButton, SearchControl } from '@pbe/react-yandex-maps';

interface IMaps {
  userCoord: ICoord;
  focusCoord: ICoord;
  clinicData: IClinicListData['results'];
  handleCardClick: (data: IOrganization) => void;
  filterDistrict: string;
}

export default function Maps({ userCoord, focusCoord, clinicData, handleCardClick, filterDistrict }: IMaps) {
  const { latitude, longitude } = userCoord;
  const { latitude: focuse_lat, longitude: focus_long } = focusCoord;

  const getVisibleData = () =>
    filterDistrict ? [...clinicData].filter((el) => el.district === filterDistrict) : clinicData;

  return latitude && focuse_lat && focus_long && longitude && Map ? (
    <section className={styles['map']}>
      <Map
        width={'100%'}
        height={'100%'}
        state={{
          center: [focuse_lat, focus_long],
          zoom: filterDistrict ? 12 : 11,
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
            iconImageHref: '/src/shared/assets/images/location.png',
            iconImageSize: [25, 35],
          }}
        />

        {getVisibleData().map((el) => (
          <Placemark
            key={`${el.latitude}${el.longitude}`}
            defaultGeometry={[el.latitude, el.longitude]}
            geometry={[el.latitude, el.longitude]}
            onClick={() => handleCardClick(el)}
            defaultProperties={{
              iconCaption: el.factual_address.slice(0, -11), //срезать г. Калуга
            }}
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
    </section>
  ) : (
    <div>Жду координаты или уже пытаюсь загрузить</div>
  );
}
