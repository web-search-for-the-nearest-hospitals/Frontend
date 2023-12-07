import './MapComponent.scss';
import switchIcon from '../../../assets/icons/switch.svg';
import locationIcon from '../../../assets/icons/location.svg';
import React from 'react';
import DropDown from '../DropDown/DropDown';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function MapComponent() {
  const [district, setDistrict] = React.useState('');
  const districs = ['Центральный', 'Не центральный', 'Третий'];

  const mapState = { center: [55.751574, 37.573856], zoom: 9 };

  const handleChangeDistrict = (data: string) => {
    setDistrict(data);
  };

  console.log(district);

  return (
    <div className="map">
      <div className="map__location">
        <img className="map__location-icon" src={locationIcon} alt="Иконка локации" />
        <p className="map__location-text">Ярославль</p>
      </div>

      <div className="map__group">
        <DropDown values={districs} onChangeValue={handleChangeDistrict} label={'Районы'} />
        <div className="map__group-switch">
          <img src={switchIcon} alt="" />
          <p>Геолокация</p>
        </div>
      </div>
      <YMaps>
        <div>
          <Map defaultState={mapState} width="635px" height="395px">
            <Placemark geometry={[55.751574, 37.573856]} />
          </Map>
        </div>
      </YMaps>
    </div>
  );
}
