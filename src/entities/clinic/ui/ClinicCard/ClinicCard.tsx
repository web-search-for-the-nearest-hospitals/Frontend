import './ClinicCard.scss';
import { IOrganization } from '~/shared/lib/types/interfaces';
import { TimetableList } from '~/shared/ui';

interface IClinicCard {
  clinic: IOrganization;
  handleCardClick: (data: IOrganization) => void;
}

export function ClinicCard({ clinic, handleCardClick }: IClinicCard) {
  return (
    <div className="clinic-card" onClick={() => handleCardClick(clinic)}>
      <h3 className="clinic-card__name">{clinic.short_name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        {TimetableList(clinic, 'card')}
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
