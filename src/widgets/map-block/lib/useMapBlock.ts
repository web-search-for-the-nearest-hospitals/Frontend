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
  const [isDragCoord, setIsDragCoord] = useState(false);

  const [triggerQuery, queryResult] = useLazyGetTownsDataByIdQuery();
  const { data: curTown, isLoading: isLoadingCurTown, isError: isErrorCurTown } = queryResult;
  const { data: towns, isLoading: isLoadingTowns, isError: isErrorTowns } = useGetTownsQuery(null);

  // крючок получения геолоки пользователя
  useEffect(() => {
    if (isSearchUser) {
      setIsDragCoord(false);
      watchUserPosition((data: ICoord) => {
        dispatch(setCoord(data));
        setFocusCoord(data);
      });
    }
  }, [isSearchUser, dispatch]);

  // крючок обработки ошибки списка городов
  useEffect(() => {
    if (isErrorTowns || isErrorCurTown) {
      createToast('error', 'Не удалось получить данные городов');
    }
  }, [isErrorTowns, isErrorCurTown]);

  //  крючок выбора города
  useEffect(() => {
    if (towns) {
      setTownIndex(towns.findIndex((el) => el.name === townName));
    }
  }, [towns, setTownIndex, townName]);

  // крючок для реагирования на drag метки со стороны пользователя
  useEffect(() => {
    setFocusCoord(userCoord);
  }, [userCoord]);

  // крючок смены стейта drag метки на карет
  useEffect(() => {
    // Только когда переключатель навигации выключен, а координаты изменились -> изменить стейт
    if (!isSearchUser && coord) {
      setIsDragCoord(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord]);

  // крючок отображения местоположения
  useEffect(() => {
    if ((isSearchUser || isDragCoord) && coord.latitude && coord.longitude) {
      setUserCoord(coord);
      setFocusCoord(coord);
    } else if (curTown) {
      setUserCoord(curTown);
      setFocusCoord(curTown);
    }
  }, [coord, isDragCoord, isSearchUser, curTown]);

  // крючок отображения фокуса
  useEffect(() => {
    if (district && curTown) {
      const newCoord = curTown?.districts.find((el) => el.name === district) || curTown;
      setFocusCoord(newCoord);
    }
  }, [district, curTown]);

  // крючок запроса за данными конкретного города
  useEffect(() => {
    if (townIndex !== null && towns) {
      const ar = towns[townIndex]?.relative_addr.match(/\d+/) || [];
      const arg = ar[0] || `${townIndex + 1}`;
      triggerQuery(arg);
    }
  }, [towns, townIndex, triggerQuery]);

  // крючок контроля текста для пользователя
  useEffect(() => {
    if (isLoadingTowns || isLoadingCurTown || !curTown || !towns) {
      setReturnText('Загружаю данные городов');
    } else if (townIndex === null) {
      setReturnText('Нет данных');
    } else {
      setReturnText(null);
    }
  }, [isLoadingCurTown, isLoadingTowns, curTown, townIndex, towns]);

  return {
    userCoord,
    focusCoord,
    returnText,
    curTown,
  };
}
