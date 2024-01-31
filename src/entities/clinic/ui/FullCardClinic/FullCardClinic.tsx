import './FullCardClinic.scss';
import { NavLink, useParams } from 'react-router-dom';

import { Button } from '~/shared/ui/index';
import { IOrganization } from '~/shared/lib/types/interfaces';
import TimetableClinic from '../TimetableClinic/TimetableClinic';
import { useState } from 'react';

interface IFullCard {
  clinic: IOrganization;
}

export function FullCardClinic({ clinic }: IFullCard) {
  const { specialtyId } = useParams();
  const [clinicId] = useState(clinic?.relative_addr?.replace('/api/organizations/', ''));
  const getIsPhone = () => window.screen.width < 625;

  return (
    <div className={`clinic-popup ${clinicId === undefined ? 'clinic-popup__card' : ''}`}>
      <h3 className="clinic-popup__name">{clinic.short_name}</h3>
      <p className="clinic-popup__about">{clinic.about}</p>
      <div className="clinic-popup__timetable">
        <p className="clinic-popup__timetable-title">График работы:</p>
        {TimetableClinic(clinic, 'popup')}
      </div>
      <div className="clinic-popup__address">
        <p className="clinic-popup__address-text">
          <span className="clinic-popup__address-title">Адрес:</span>
          {clinic.factual_address}
        </p>
      </div>
      <div className="clinic-popup__phone">
        <p className="clinic-popup__phone-title">Телефон: </p>
        <a
          href={`tel:${clinic.phone}`}
          className={`clinic-popup__phone-number, ${getIsPhone() ? 'clinic-popup__phone-number_active' : ''}`}
          style={{ pointerEvents: getIsPhone() ? 'auto' : 'none' }}
        >
          {clinic.phone}
        </a>
      </div>
      <div className="clinic-popup__site">
        <p className="clinic-popup__site-title">Сайт: </p>
        <a className="clinic-popup__site-link" href={clinic.site} target="_blank" rel="noopener noreferrer">
          {clinic.site}
        </a>
      </div>
      {/* format relative_addr: /api/organizations/id/ - на конце слеш */}
      <NavLink to={`../appointment/${clinicId}/${specialtyId}`}>
        <Button title="Записаться" size="m" type="submit" />
      </NavLink>
      <NavLink to={`../card/${clinicId}`}>
        <Button title="Показать отдельно" size="m" type="submit" />
      </NavLink>
    </div>
  );
}
