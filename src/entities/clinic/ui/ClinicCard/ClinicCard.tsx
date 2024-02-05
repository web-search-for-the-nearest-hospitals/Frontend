import './ClinicCard.scss';

import { IOrganizationFromList } from '~/shared/lib/types/interfaces';
import TimetableClinic from '../TimetableClinic/TimetableClinic';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

interface IClinicCard {
  clinic: IOrganizationFromList;
}

export function ClinicCard({ clinic }: IClinicCard) {
  const [clinicId] = useState(clinic?.relative_addr?.replace('/api/organizations/', ''));
  return (
    <div className="clinic-card">
      <NavLink className="clinic" to={`../card/${clinicId}`}>
        <h3 className="clinic-card__name">{clinic.short_name}</h3>
      </NavLink>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        {TimetableClinic(clinic, 'card')}
      </div>
      <div className="clinic-card__phone">
        <p className="clinic-card__phone-title">Телефон: </p>
        <p className="clinic-card__phone-number">{clinic.phone}</p>
      </div>
      <div className="clinic-card__address">
        <p className="clinic-card__address-title">Адрес:</p>
        <p className="clinic-card__address-value">{clinic.factual_address}</p>
      </div>
    </div>
  );
}
