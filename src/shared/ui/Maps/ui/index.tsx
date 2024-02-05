import styles from './index.module.scss';
import { Map, Placemark, RouteButton, SearchControl } from '@pbe/react-yandex-maps';

import { setCoord, userSelect } from '~/entities/user';

import locationIcon from '~/shared/assets/icons/location.svg';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { IClinicListData, ICoord } from '~/shared/lib/types/interfaces';

interface IMaps {
  focusCoord: ICoord;
  clinicData: IClinicListData['results'];
  filterDistrict: string;
}

export default function Maps({ focusCoord, clinicData, filterDistrict }: IMaps) {
  const dispatch = useAppDispatch();
  const coord = useAppSelector(userSelect);
  const { latitude, longitude } = coord;
  const { latitude: focuse_lat, longitude: focus_long } = focusCoord;

  const getVisibleData = () =>
    filterDistrict ? [...clinicData].filter((el) => el.district === filterDistrict) : clinicData;

  const handleDragEnd = (e: ymaps.Event) => {
    const [lat, long] = e.get('target').geometry.getCoordinates();
    dispatch(setCoord({ latitude: lat, longitude: long }));
  };

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
        {getVisibleData().map((el) => (
          <Placemark
            key={`${el.latitude}${el.longitude}`}
            defaultGeometry={[el.latitude, el.longitude]}
            geometry={[el.latitude, el.longitude]}
            defaultProperties={{
              iconCaption: el.short_name,
            }}
          />
        ))}
        <Placemark
          defaultGeometry={[latitude, longitude]}
          geometry={[latitude, longitude]}
          options={{
            iconLayout: 'default#image',
            iconImageHref: locationIcon,
            iconImageSize: [25, 35],
            draggable: true,
            zIndex: 1000, // чтоб наверняка
          }}
          onDragEnd={handleDragEnd}
        />
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
