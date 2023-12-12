import './index.scss';
import React, { useEffect } from 'react';

import { districs } from '../lib/consts';
import Maps from '~/shared/ui/Maps';
import { userSelect } from '~/entities/user';

import switchIcon from '~/shared/assets/icons/switch.svg';
import locationIcon from '~/shared/assets/icons/location.svg';
import DropDown from '~/shared/ui/DropDown/DropDown';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';

export default function MapBlock() {
  const { latitude, longitude } = useAppSelector(userSelect).coord;
  const [district, setDistrict] = React.useState('');

  const handleChangeDistrict = (data: string) => {
    setDistrict(data);
  };

  useEffect(() => {
    console.log(district);
  }, [district]);

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
      <div className="map__container">
        <Maps longitude={longitude} latitude={latitude} />
      </div>
    </div>
  );
}
