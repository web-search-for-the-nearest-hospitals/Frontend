import './index.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FullCardClinic } from '~/entities/clinic';
import { useLazyGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { IOrganization } from '~/shared/lib/types/interfaces';

export default function ClinicPage() {
  const { clinicId } = useParams();
  const [triggerQuery, queryResult] = useLazyGetOrganizationByIdQuery();
  const [organizationsById, setOrganizationsById] = useState<IOrganization>();

  useEffect(() => {
    triggerQuery(`${clinicId}`);
  }, [clinicId, triggerQuery]);

  useEffect(() => {
    if (queryResult) {
      setOrganizationsById(queryResult.currentData);
      console.log(organizationsById);
    }
  }, [organizationsById, queryResult]);

  return <div>{organizationsById ? <FullCardClinic clinic={organizationsById} /> : null}</div>;
}
