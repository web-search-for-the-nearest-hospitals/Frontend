import './ClinicCard.scss';
import { IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicCard {
  clinic: IOrganization;
  handleCardClick: (data: IOrganization) => void;
}

// TODO: написать парсер для business_hours в формат макета - поле с графиком работы
export function ClinicCard({ clinic, handleCardClick }: IClinicCard) {
  return (
    <div className="clinic-card" onClick={() => handleCardClick(clinic)}>
      <h3 className="clinic-card__name">{clinic.short_name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <p className="clinic-card__timetable-period">{'Пн-Пт: 8:00–17:00 Сб-Вс: Выходной'}</p>
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
