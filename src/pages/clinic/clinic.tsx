import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FullCardClinic } from '~/entities/clinic';
import { useLazyGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { IOrganizationById, IOrganizationFromList } from '~/shared/lib/types/interfaces';

export default function ClinicPage() {
  const { clinicId } = useParams();
  const nav = useNavigate();
  const [triggerQuery, queryResult] = useLazyGetOrganizationByIdQuery();
  const [organizationsById, setOrganizationsById] = useState<IOrganizationById>();

  useEffect(() => {
    triggerQuery(`${clinicId}`);
  }, [clinicId, triggerQuery]);

  useEffect(() => {
    if (queryResult) {
      setOrganizationsById(queryResult.currentData);
    }
  }, [organizationsById, queryResult]);

  return (
    // @TODO Надо подумать над организацией типов
    <div className="clinic-page">
      <button className="clinic-page__button-nav" onClick={() => nav(-1)}>
        <span className="clinic-page__arrow-back"> &#8249;</span> Назад
      </button>
      {organizationsById ? <FullCardClinic clinic={organizationsById as unknown as IOrganizationFromList} /> : null}
    </div>
  );
}
