import './index.scss';

export function FullCardClinic() {
  return (
    <div className="clinic-popup clinic-popup_opened">
      <div className="clinic-popup__container">
        <h3 className="clinic-popup__name">
          Частное учреждение здравоохранения больница РЖД-Медицина имени К. Э. Циолковского
        </h3>
        <p className="clinic-popup__about">
          Наша клиника предлагает высококачественные, индивидуальные и безопасные медицинские услуги с использованием
          передовых технологий. Мы стремимся к высокому уровню профессионализма и заботы о каждом пациенте.
        </p>
        <div className="clinic-popup__timetable">
          <p className="clinic-popup__timetable-title">График работы:</p>
          <div className="clinic-popup__timetable-periods">
            <p className="clinic-popup__timetable-period">ежедневно, </p>
            <p className="clinic-popup__timetable-period">круглосуточно</p>
          </div>
        </div>
        <div className="clinic-popup__phone">
          <p className="clinic-popup__phone-title">Телефон: </p>
          <p className="clinic-popup__phone-number">+7 (4842) 73-84-13</p>
        </div>
        <div className="clinic-popup__site">
          <p className="clinic-popup__site-title">Сайт: </p>
          <a
            className="clinic-popup__site-link"
            href="https://www.vitalmedclinic.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.vitalmedclinic.ru
          </a>
        </div>
        <div className="clinic-popup__address">
          <p className="clinic-popup__address-title">Адрес:</p>
          <p className="clinic-popup__address-value">ул. Болотникова, 1Б</p>
        </div>
        {/* <p className="clinic-popup__price">Прием от 1000₽</p> */}
        <button className="clinic-popup__button">Записаться</button>
      </div>
    </div>
  );
}
