import './index.scss';

import { useCallback, useEffect, useState } from 'react';
import useMapBlock from '../lib/useMapBlock';
import { districtDefault } from '../lib/consts';

import { Maps, ToggleButton, DropDownInput } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';
import { IClinicListData, IOrganizationFromList } from '~/shared/lib/types/interfaces';

interface IMapBlock {
  clinicData: IClinicListData | undefined;
  handleCardClick: (data: IOrganizationFromList) => void;
  district: string;
  setDistrict: (val: string) => void;
}

export default function MapBlock({ clinicData, handleCardClick, district, setDistrict }: IMapBlock) {
  const [isSearchUser, setIsSearchUser] = useState(false); // вкл\выкл геолоку юзера
  const [townName] = useState('Калуга');

  const useMapBlockData = useMapBlock({ district, isSearchUser, townName });
  const { returnText, curTown, focusCoord } = useMapBlockData;

  const getFilterDistrict = () => (district === districtDefault ? '' : district);

  // крючок сброса стейта района
  useEffect(() => {
    setDistrict(districtDefault);
  }, [clinicData, setDistrict]);

  if (returnText || !curTown) {
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
            values={curTown!.districts.map((el) => el.name) || []}
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
        <Maps
          focusCoord={focusCoord}
          clinicData={clinicData?.results || []}
          handleCardClick={handleCardClick}
          filterDistrict={getFilterDistrict()}
        />
      </div>
    </div>
  );
}