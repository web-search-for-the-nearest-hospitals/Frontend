import React, { useEffect } from 'react';
import switchIcon from '~/shared/assets/icons/switch.svg';
import locationIcon from '~/shared/assets/icons/location.svg';

import DropDown from '~/shared/ui/DropDown/DropDown';
import { useAppSelector } from '~/shared/helpers/customHooks/reduxHooks';
import { userSelect } from '~/shared/store/slices/userSlice';
import { GetMap } from '~/features/get-map';
import './MapComponent.scss';

export default function MapComponent() {
  const { latitude, longitude } = useAppSelector(userSelect).coord;
  const [district, setDistrict] = React.useState('');
  // @TODO заменить на данные с бэка
  const districs = ['Центральный', 'Не центральный', 'Третий'];

  const handleChangeDistrict = (data: string) => {
    setDistrict(data);
  };

  useEffect(() => {
    console.log(district);
  }, [district]);

  return (
    <div className="map">
      {/* Можно вынести это в shared, но лаконичнее не станет */}
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
      <div className="map__container">
        <GetMap longitude={longitude} latitude={latitude} />
      </div>
    </div>
  );
}
