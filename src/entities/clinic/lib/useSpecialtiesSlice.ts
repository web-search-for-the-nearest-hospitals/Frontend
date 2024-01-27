import { useEffect, useState } from 'react';
// import { setSpecialty, specialtySelect } from '..';
import { setSpecialty, specialtySelect } from '../model/specialtiesSlice/specialtiesSlise';

import { useGetSpecialtiesQuery } from '~/shared/api/rtkqueryApi';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import createToast from '~/shared/lib/toast/createToast';

export default function useSpecialtiesSlice() {
  const { data, isError } = useGetSpecialtiesQuery(null);
  const [isGetSpecialty, setIsGetSpecialty] = useState(false);
  const dispatch = useAppDispatch();
  const specialties = useAppSelector(specialtySelect);

  useEffect(() => {
    if (data) {
      dispatch(setSpecialty(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (specialties) {
      setIsGetSpecialty(true);
    }
  }, [specialties]);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список специальностей');
    }
  }, [isError]);

  useEffect;

  return { isGetSpecialty };
}
