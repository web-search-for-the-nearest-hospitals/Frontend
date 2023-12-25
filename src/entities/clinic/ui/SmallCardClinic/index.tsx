import './index.scss';

export function SmallCardClinic() {
  return (
    <div className="card-clinic">
      <h3 className="clinic__name">
        Частное учреждение здравоохранения больница РЖД-Медицина имени К. Э. Циолковского
      </h3>
      <div className="schedule__container">
        <p className="schedule__title">График работы:</p>
        <div className="schedule__types">
          <p className="schedule__type">ежедневно, </p>
          <p className="schedule__type">круглосуточно</p>
        </div>
      </div>
      <div className="phone__container">
        <p className="phone__title">Телефон: </p>
        <p className="phone__number">+7 (4842) 73-84-13</p>
      </div>
      <div className="address__container">
        <p className="address__title">Адрес:</p>
        <p className="address__value">ул. Болотникова, 1Б</p>
      </div>
      <p className="price__container">Прием от 1000₽</p>
    </div>
  );
}
