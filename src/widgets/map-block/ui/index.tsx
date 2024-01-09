import './index.scss';
import { useEffect, useState } from 'react';
import { setCoord, userSelect } from '~/entities/user';
import { Maps, ToggleButton, DropDownInput } from '~/shared/ui';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { LocationIcon } from '~/shared/assets';
import watchUserPosition from '~/entities/user/lib/watchUserPosition';
import { IClinicListData, ICoord, ITown } from '~/shared/lib/types/interfaces';
import { useGetTownsQuery } from '~/shared/api/rtkqueryApi';
import { createToast } from '~/shared/lib';

interface IMapBlock {
  clinicData: IClinicListData | undefined;
}

// @TODO: как устаканится формат с бэка, проверить логику. Возможно оптимизировать менеджмент
export default function MapBlock({ clinicData }: IMapBlock) {
  const dispatch = useAppDispatch();
  const coord = useAppSelector(userSelect);
  const [stateCoord, setStateCoord] = useState<ICoord>(coord);
  const [district, setDistrict] = useState('Не выбрано');
  const [geo, setGeo] = useState(false);
  const [town] = useState('Калуга');
  const [townIndex, setTownIndex] = useState<null | number>(null);
  const { data, isLoading, isError } = useGetTownsQuery(null);

  useEffect(() => {
    if (geo) {
      watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
    }
  }, [geo, dispatch]);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить данные городов');
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setTownIndex(data.findIndex((el) => el.name === town));
    }
  }, [data, setTownIndex, town]);

  useEffect(() => {
    if (geo && coord.latitude && coord.longitude) {
      setStateCoord(coord);
    } else if (townIndex !== null && data) {
      const { latitude, longitude } = data[townIndex] as ITown;
      setStateCoord({ latitude, longitude });
    }
  }, [coord, data, geo, townIndex]);

  if (isLoading || !data || townIndex === null) {
    return <p className="search-clinic">Загружаю данные городов</p>;
  }

  return (
    <div className="map">
      <div className="map__location">
        <LocationIcon size={30} />
        <p className="map__location-text">{town}</p>
      </div>

      <div className="map__group">
        <div className="map__input-container">
          <DropDownInput values={data[townIndex]?.districts || []} state={district} setState={setDistrict} />
        </div>
        <div className="map__group-switch">
          <ToggleButton setState={setGeo} state={geo} />
          <p className="map__group-switch-text">Геолокация</p>
        </div>
      </div>

      <div className="map__container">
        <Maps longitude={stateCoord?.longitude} latitude={stateCoord?.latitude} clinicData={clinicData} />
      </div>
    </div>
  );
}
