import { useEffect, useState } from 'react';

import watchUserPosition from '~/entities/user/lib/watchUserPosition';
import { setCoord, userSelect } from '~/entities/user';

import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import createToast from '~/shared/lib/toast/createToast';
import { ICoord } from '~/shared/lib/types/interfaces';
import { useGetTownsQuery, useLazyGetTownsDataByIdQuery } from '~/shared/api/rtkqueryApi';

interface IUseMapBlock {
  isSearchUser: boolean;
  townName: string;
  district: string;
}

export default function useMapBlock({ isSearchUser, townName, district }: IUseMapBlock) {
  const dispatch = useAppDispatch();
  const coord = useAppSelector(userSelect);

  const [userCoord, setUserCoord] = useState(coord);
  const [focusCoord, setFocusCoord] = useState(coord);
  const [townIndex, setTownIndex] = useState<null | number>(null);
  const [returnText, setReturnText] = useState<null | string>(null);

  const [triggerQuery, queryResult] = useLazyGetTownsDataByIdQuery();
  const { data: townData, isLoading: isLoadingTown, isError: townIsError } = queryResult;
  const { data: townsData, isLoading: isLoadingTowns, isError: isErrorTowns } = useGetTownsQuery(null);

  // крючок получения геолоки пользователя
  useEffect(() => {
    if (isSearchUser) {
      watchUserPosition((data: ICoord) => {
        dispatch(setCoord(data));
        setFocusCoord(data);
      });
    }
  }, [isSearchUser, dispatch]);

  // крючок обработки ошибки списка городов
  useEffect(() => {
    if (isErrorTowns || townIsError) {
      createToast('error', 'Не удалось получить данные городов');
    }
  }, [isErrorTowns, townIsError]);

  //  крючок выбора города
  useEffect(() => {
    if (townsData) {
      setTownIndex(townsData.findIndex((el) => el.name === townName));
    }
  }, [townsData, setTownIndex, townName]);

  // крючок отображения местоположения
  useEffect(() => {
    if (isSearchUser && coord.latitude && coord.longitude) {
      setUserCoord(coord);
      setFocusCoord(coord);
    } else if (townData) {
      setUserCoord(townData);
      setFocusCoord(townData);
    }
  }, [coord, isSearchUser, townData]);

  // крючок отображения фокуса
  useEffect(() => {
    if (district && townData) {
      const newCoord = townData?.districts.find((el) => el.name === district) || townData;
      setFocusCoord(newCoord);
    }
  }, [district, townData]);

  // крючок запроса за данными конкретного города
  useEffect(() => {
    if (townIndex !== null && townsData) {
      const ar = townsData[townIndex]?.relative_addr.match(/\d+/) || [];
      const arg = ar[0] || `${townIndex + 1}`;
      triggerQuery(arg);
    }
  }, [townsData, townIndex, triggerQuery]);

  useEffect(() => {
    if (isLoadingTowns || isLoadingTown || !townData || !townsData) {
      setReturnText('Загружаю данные городов');
    } else if (townIndex === null) {
      setReturnText('Нет данных');
    } else {
      setReturnText(null);
    }
  }, [isLoadingTown, isLoadingTowns, townData, townIndex, townsData]);

  return {
    userCoord,
    focusCoord,
    returnText,
    townData,
  };
}
