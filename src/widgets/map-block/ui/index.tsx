import './index.scss';
import { useEffect, useState } from 'react';

import { districtCoord, districts } from '../lib/consts';
import { setCoord, userSelect } from '~/entities/user';

import { Maps, CheckBox, DropDownInput } from '~/shared/ui';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { LocationIcon } from '~/shared/assets';
import watchUserPosition from '~/entities/user/lib/watchUserPosition';
import { ICoord } from '~/shared/lib/types/interfaces';

export default function MapBlock() {
  const dispatch = useAppDispatch();
  const coord = useAppSelector(userSelect);
  const [stateCoord, setStateCoord] = useState<ICoord>(coord);
  const [district, setDistrict] = useState(districts[0]!);
  const [geo, setGeo] = useState(false);

  useEffect(() => {
    if (geo) {
      watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
    }
  }, [geo, dispatch]);

  useEffect(() => {
    console.log('i work', geo, coord, coord.latitude, coord.longitude);
    if (geo && coord.latitude && coord.longitude) {
      setStateCoord(coord);
    } else if (district) {
      setStateCoord(districtCoord[district]!);
    }
  }, [coord, district, geo]);

  useEffect(() => {
    console.log(stateCoord);
  }, [stateCoord]);

  return (
    <div className="map">
      <div className="map__location">
        <LocationIcon />
        <p className="map__location-text mp-0">Калуга</p>
      </div>

      <div className="map__group">
        <DropDownInput values={districts} state={district} setState={setDistrict} />
        <div className="map__group-switch">
          <CheckBox setState={setGeo} state={geo} />
          <p className="map__group-switch-text mp-0">Геолокация</p>
        </div>
      </div>

      <div className="map__container">
        <Maps longitude={stateCoord?.longitude} latitude={stateCoord?.latitude} />
      </div>
    </div>
  );
}
