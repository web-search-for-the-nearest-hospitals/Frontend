import { useEffect, useState } from 'react';
import { setDistrict, districtSelect } from '../model/districtSlice/districtSlise';

import { useGetDistrictsQuery } from '~/shared/api/rtkqueryApi';
import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import createToast from '~/shared/lib/toast/createToast';

export default function useDistrictsSlice() {
  const { data, isError } = useGetDistrictsQuery(null);
  const [isGetDistrict, setIsGetDistrict] = useState(false);
  const dispatch = useAppDispatch();
  const districts = useAppSelector(districtSelect);

  useEffect(() => {
    if (data) {
      dispatch(setDistrict(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (districts) {
      setIsGetDistrict(true);
    }
  }, [districts]);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Организации для данного региона не найдены');
    }
  }, [isError]);

  useEffect;

  return { isGetDistrict };
}
