import './ClinicCard.scss';
import { IOrganization } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../../lib/getTimetable';

interface IClinicCard {
  clinic: IOrganization;
}

export function ClinicCard({ clinic }: IClinicCard) {
  const date = new Date();
  const today = date.getDay() || 7;

  return (
    <div className="clinic-card" onClick={() => alert('Представьте, что я Попап! Большой и информативный!')}>
      <h3 className="clinic-card__name">{clinic.short_name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <ul className="clinic-card__timetable-period">
          {getTimetable(clinic).map((day, index) => (
            <li key={index} style={{ color: index + 1 === today ? '#695feb' : '#3b405d' }}>
              {day}
            </li>
          ))}
        </ul>
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
