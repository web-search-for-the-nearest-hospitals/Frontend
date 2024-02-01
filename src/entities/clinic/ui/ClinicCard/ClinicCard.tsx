import './ClinicCard.scss';
import distanceIco from '~/shared/assets/icons/distance.svg';
import ratingIco from '~/shared/assets/icons/rating.svg';

import { IOrganization } from '~/shared/lib/types/interfaces';
import TimetableClinic from '../TimetableClinic/TimetableClinic';

interface IClinicCard {
  clinic: IOrganization;
  handleCardClick: (data: IOrganization) => void;
}

export function ClinicCard({ clinic, handleCardClick }: IClinicCard) {
  return (
    <div className="clinic-card">
      <div className="clinic-card__widget-block">
        <div className="clinic-card__widget-distance">
          <img src={distanceIco} alt="distance icon" />
          <p className="clinic-card__widget-distance-value">({clinic.distance})</p>
        </div>
        <div className="clinic-card__widget-rating">
          <p className="clinic-card__widget-rating-value">{clinic.rating === null ? '0' : clinic.rating?.toFixed(1)}</p>
          <img src={ratingIco} alt="rating icon" className="clinic-card__widget-rating-ico" />
        </div>
      </div>
      <h3 className="clinic-card__name" onClick={() => handleCardClick(clinic)}>
        {clinic.short_name}
      </h3>
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
      {clinic.can_appoint === true ? <p className="clinic-card__appoint">Возможна онлайн запись</p> : ''}
    </div>
  );
}
