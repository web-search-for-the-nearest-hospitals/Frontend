import './index.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FullCardClinic } from '~/entities/clinic';
import { useLazyGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { IOrganizationById, IOrganizationFromList } from '~/shared/lib/types/interfaces';

export default function ClinicPage() {
  const { clinicId } = useParams();
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
    <div>
      {organizationsById ? <FullCardClinic clinic={organizationsById as unknown as IOrganizationFromList} /> : null}
    </div>
  );
}
