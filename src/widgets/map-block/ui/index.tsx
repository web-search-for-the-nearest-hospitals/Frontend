import './index.scss';
import { useEffect, useState } from 'react';

import { districtCoord } from '../lib/consts';
import { setCoord, userSelect } from '~/entities/user';

import { Maps, ToggleButton, DropDownInput } from '~/shared/ui';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { LocationIcon } from '~/shared/assets';
import watchUserPosition from '~/entities/user/lib/watchUserPosition';
import { ICoord } from '~/shared/lib/types/interfaces';

export default function MapBlock() {
  const dispatch = useAppDispatch();
  const coord = useAppSelector(userSelect);
  const [stateCoord, setStateCoord] = useState<ICoord>(coord);
  const [district, setDistrict] = useState(Object.keys(districtCoord)[0]!);
  const [geo, setGeo] = useState(false);

  useEffect(() => {
    if (geo) {
      watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
    }
  }, [geo, dispatch]);

  useEffect(() => {
    if (geo && coord.latitude && coord.longitude) {
      setStateCoord(coord);
    } else if (district) {
      setStateCoord(districtCoord[district]!);
    }
  }, [coord, district, geo]);
  return (
    <div className="map">
      <div className="map__location">
        <LocationIcon />
        <p className="map__location-text">Калуга</p>
      </div>

      <div className="map__group">
        <div className="map__input-container">
          <DropDownInput values={Object.keys(districtCoord)} state={district} setState={setDistrict} />
        </div>
        <div className="map__group-switch">
          <ToggleButton setState={setGeo} state={geo} />
          <p className="map__group-switch-text">Геолокация</p>
        </div>
      </div>

      <div className="map__container">
        <Maps longitude={stateCoord?.longitude} latitude={stateCoord?.latitude} />
      </div>
    </div>
  );
}
