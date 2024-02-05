import './index.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FullCardClinic } from '~/entities/clinic';
import { useLazyGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { IOrganizationFromList } from '~/shared/lib/types/interfaces';

export default function ClinicPage() {
  const { clinicId } = useParams();
  const [triggerQuery, queryResult] = useLazyGetOrganizationByIdQuery();
  const [organizationsById, setOrganizationsById] = useState<IOrganizationFromList | unknown>();

  useEffect(() => {
    triggerQuery(`${clinicId}`);
  }, [clinicId, triggerQuery]);

  useEffect(() => {
    if (queryResult) {
      setOrganizationsById(queryResult.currentData);
    }
  }, [organizationsById, queryResult]);

  return <div>{organizationsById ? <FullCardClinic clinic={organizationsById as IOrganizationFromList} /> : null}</div>;
}
