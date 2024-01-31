import { useParams } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

import { FullCardClinic } from '~/entities/clinic';
import { useLazyGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { IOrganization } from '~/shared/lib/types/interfaces';

export default function ClinicPage() {
  const { clinicId } = useParams();
  const [triggerQuery2, queryResult2] = useLazyGetOrganizationByIdQuery();
  const [organizationsById, setOrganizationsById] = useState<IOrganization>();

  useEffect(() => {
    triggerQuery2(`${clinicId}`);
  }, [clinicId, triggerQuery2]);

  useEffect(() => {
    if (queryResult2) {
      setOrganizationsById(queryResult2.currentData);
      console.log(organizationsById);
    }
  }, [organizationsById, queryResult2]);

  return <div>{organizationsById ? <FullCardClinic clinic={organizationsById} /> : null}</div>;
}
