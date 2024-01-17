import './ClinicCard.scss';
import { IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicCard {
  clinic: IOrganization;
}

export function ClinicCard({ clinic }: IClinicCard) {
  const date = new Date();
  let today = date.getDay();
  // Date обрабатывает Вс как 0, поэтому, когда наш текущий день Вс задаем ему индекс 7, чтобы в бд не менять
  today === 0 ? (today = 7) : (today = date.getDay());

  const weekdaysHours = () => {
    let fromHours, toHours, dayFromDB: number, day: string, hours: string;
    const weekdays = clinic.business_hours.map((weekday) => {
      dayFromDB = weekday.day;

      fromHours = weekday.from_hour.slice(0, -3);
      toHours = weekday.to_hour.slice(0, -3);
      hours = `${fromHours}-${toHours}`;
      hours === '00:00-00:00' && (hours = 'Круглосуточно');
      // или может так лучше выглядит:
      // hours === '00:00-00:00' && (hours = '24 часа в сутки');

      switch (dayFromDB) {
        case 1:
          day = 'Пн';
          break;
        case 2:
          day = 'Вт';
          break;
        case 3:
          day = 'Ср';
          break;
        case 4:
          day = 'Чт';
          break;
        case 5:
          day = 'Пт';
          break;
        case 6:
          day = 'Сб';
          break;
        case 7:
          day = 'Вс';
          break;
      }

      return `${day}: ${hours}`;
    });

    return weekdays;
  };

  return (
    <div className="clinic-card" onClick={() => alert('Представьте, что я Попап! Большой и информативный!')}>
      <h3 className="clinic-card__name">{clinic.short_name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <ul className="clinic-card__timetable-period">
          {weekdaysHours().map((day, index) => (
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
