import React from 'react';
import switchIcon from '~/shared/icons/switch.svg';
import locationIcon from '~/shared/icons/location.svg';
import DropDown from '~/shared/ui/DropDown/DropDown';
import { useYandexMap } from '~/shared/helpers/customHooks/useYandexMap';
import { useAppSelector } from '~/shared/helpers/customHooks/reduxHooks';
import { userSelect } from '~/shared/store/slices/userSlice';
import './MapComponent.scss';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function MapComponent() {
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = useYandexMap();
  const { latitude, longitude } = useAppSelector(userSelect).coord;
  const [district, setDistrict] = React.useState('');
  const districs = ['Центральный', 'Не центральный', 'Третий'];

  const mapState = { center: [longitude, latitude], zoom: 9 };

  const handleChangeDistrict = (data: string) => {
    setDistrict(data);
  };

  console.log(district);

  return (
    <div className="map">
      <div className="map__location">
        <img className="map__location-icon" src={locationIcon} alt="Иконка локации" />
        <p className="map__location-text">Город такой-то</p>
      </div>

      <div className="map__group">
        <DropDown values={districs} onChangeValue={handleChangeDistrict} label={'Районы'} />
        <div className="map__group-switch">
          <img src={switchIcon} alt="" />
          <p>Геолокация</p>
        </div>
      </div>

      {/* <YMaps>
        <div>
          <Map defaultState={mapState} width="635px" height="395px">
            <Placemark geometry={[55.751574, 37.573856]} />
          </Map>
        </div>
      </YMaps> */}

      {/* заменил */}
      {latitude && longitude && YMap && (
        <div className="map__container">
          <span>карта</span>
          <YMap location={mapState} mode="vector">
            <YMapDefaultSchemeLayer />
            <YMapDefaultFeaturesLayer />
            <YMapMarker coordinates={[longitude, latitude]} draggable={true}>
              <div className="map-page__mark" />
              <span className="map-page__mark-text">Вы</span>
            </YMapMarker>
          </YMap>
        </div>
      )}
    </div>
  );
}
