import './ClinicCard.scss';

export function ClinicCard({ clinic }: any) {
  return (
    <div className="clinic-card">
      <h3 className="clinic-card__name">{clinic.name}</h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <p className="clinic-card__timetable-period">{clinic.timetable} </p>
      </div>
      <div className="clinic-card__phone">
        <p className="clinic-card__phone-title">Телефон: </p>
        <p className="clinic-card__phone-number">{clinic.phone}</p>
      </div>
      <div className="clinic-card__address">
        <p className="clinic-card__address-title">Адрес:</p>
        <p className="clinic-card__address-value">{clinic.address}</p>
      </div>
    </div>
  );
}
