import './ClinicCard.scss';
import { IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicCard {
  clinic: IOrganization;
}

// TODO: написать парсер для business_hours в формат макета - поле с графиком работы
export function ClinicCard({ clinic }: IClinicCard) {
  let timetablePeriod = 'Не указан';
  const dayoff = 'Выходной';

  const weekdaysHours = () => {
    let fromHours = '',
      toHours = '',
      hours = '',
      fridayHours = '',
      saturdayHours = '',
      sundayHours = '';

    for (const weekdays of clinic.business_hours) {
      fromHours = weekdays.from_hour.slice(0, -3);
      toHours = weekdays.to_hour.slice(0, -3);

      if (weekdays.day < 6) {
        hours = `${fromHours}-${toHours}`;
        timetablePeriod = `Пн-Пт: ${hours}\n Сб-Вс: ${dayoff}`;
      }

      if (weekdays.day === 5) {
        fridayHours = `${fromHours}-${toHours}`;
        fridayHours === hours
          ? (timetablePeriod = `Пн-Пт: ${hours}\n Сб-Вс: ${dayoff}`)
          : (timetablePeriod = `Пн-Чт: ${hours}\n Пт: ${fridayHours}\n Сб-Вс: ${dayoff}`);
      }

      if (weekdays.day === 6) {
        saturdayHours = `${fromHours}-${toHours}`;
        timetablePeriod = `Пн-Пт: ${hours}\n Сб: ${saturdayHours}\n Вс: ${dayoff}`;
      }

      if (weekdays.day === 7) {
        sundayHours = `${fromHours}-${toHours}`;
        sundayHours === saturdayHours
          ? (timetablePeriod = `Пн-Пт: ${hours}\n Сб-Вс: ${saturdayHours}`)
          : (timetablePeriod = `Пн-Пт: ${hours}\n Сб: ${saturdayHours}\n Вс: ${sundayHours}`);
      }
    }

    return timetablePeriod;
  };

  return (
    <div className="clinic-card" onClick={() => alert('Представьте, что я Попап! Большой и информативный!')}>
      <h3 className="clinic-card__name">{clinic.short_name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <p className="clinic-card__timetable-period">{`${weekdaysHours()}`} </p>
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
