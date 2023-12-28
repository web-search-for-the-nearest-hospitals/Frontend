import './index.scss';

export function SmallCardClinic() {
  return (
    <div className="clinic-card">
      <h3 className="clinic-card__name">
        Частное учреждение здравоохранения больница РЖД-Медицина имени К. Э. Циолковского
      </h3>
      <div className="clinic-card__timetable">
        <p className="clinic-card__timetable-title">График работы:</p>
        <div className="clinic-card__timetable-periods">
          <p className="clinic-card__timetable-period">ежедневно, </p>
          <p className="clinic-card__timetable-period">круглосуточно</p>
        </div>
      </div>
      <div className="clinic-card__phone">
        <p className="clinic-card__phone-title">Телефон: </p>
        <p className="clinic-card__phone-number">+7 (4842) 73-84-13</p>
      </div>
      <div className="clinic-card__address">
        <p className="clinic-card__address-title">Адрес:</p>
        <p className="clinic-card__address-value">ул. Болотникова, 1Б</p>
      </div>
      <p className="clinic-card__price">Прием от 1000₽</p>
    </div>
  );
}
