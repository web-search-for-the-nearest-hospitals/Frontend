import './index.scss';

import { useState } from 'react';
import useMapBlock from '../lib/useMapBlock';

import { Maps, ToggleButton, DropDownInput } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';
import { IClinicListData, IOrganization } from '~/shared/lib/types/interfaces';

interface IMapBlock {
  clinicData: IClinicListData | undefined;
  handleCardClick: (data: IOrganization) => void;
}

// @TODO Возможно вынести крючки в кастомный хук
export default function MapBlock({ clinicData, handleCardClick }: IMapBlock) {
  const [district, setDistrict] = useState('Районы');
  const [isSearchUser, setIsSearchUser] = useState(false);
  const [townName] = useState('Калуга');

  const { userCoord, focusCoord, returnText, townData } = useMapBlock({ district, isSearchUser, townName });

  if (returnText || !townData) {
    return <p className="search-clinic">{returnText || 'Что-то загружается'}</p>;
  }

  return (
    <div className="map">
      <div className="map__location">
        <LocationIcon />
        <p className="map__location-text">{townName}</p>
      </div>

      <div className="map__group">
        <div className="map__input-container">
          <DropDownInput
            values={townData!.districts.map((el) => el.name) || []}
            state={district}
            setState={setDistrict}
          />
        </div>
        <div className="map__group-switch">
          <ToggleButton setState={setIsSearchUser} state={isSearchUser} />
          <p className="map__group-switch-text">Геолокация</p>
        </div>
      </div>

      <div className="map__container">
        <Maps userCoord={userCoord} focusCoord={focusCoord} clinicData={clinicData} handleCardClick={handleCardClick} />
      </div>
    </div>
  );
}
