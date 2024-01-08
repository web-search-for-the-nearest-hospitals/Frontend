import './ClinicList.scss';

import { ClinicCard } from '../ClinicCard/ClinicCard';

import { clinics } from '~/shared/api/constants';
import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import { useEffect } from 'react';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { createToast } from '~/shared/lib';

export default function ClinicList() {
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;

  useEffect(() => {
    triggerQuery(null as unknown as IGetOrganizations);
  }, [triggerQuery]);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    } else if (data) {
      console.log(data);
    }
  }, [isError, data]);
  return (
    <div className="clinic-list">
      {isLoading ? <p>Загружаю данные</p> : clinics.map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)}
    </div>
  );
}
