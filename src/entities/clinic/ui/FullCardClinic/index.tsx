import './index.scss';
import { Popup, Button, CloseButton } from '~/shared/ui/index';

export function FullCardClinic() {
  return (
    <Popup>
      <div className="clinic-popup">
        <CloseButton type="button" />
        <h3 className="clinic-popup__name">ГБУЗКО Калужская областная клиническая больница</h3>
        <p className="clinic-popup__about">
          Наша клиника предлагает высококачественные, индивидуальные и безопасные медицинские услуги с использованием
          передовых технологий. Мы стремимся к высокому уровню профессионализма и заботы о каждом пациенте.
        </p>
        <div className="clinic-popup__timetable">
          <p className="clinic-popup__timetable-title">График работы:</p>
          <div className="clinic-popup__timetable-periods">
            <p className="clinic-popup__timetable-period">Пн-Пт: 8:00–17:00</p>
            <p className="clinic-popup__timetable-period">Сб-Вс: Выходной</p>
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
          <p className="clinic-popup__address-value">ул. Вишневского, 1, корп. 7, микрорайон Анненки, Калуга</p>
        </div>
        <Button title="Записаться" size="l" type="submit" />
      </div>
    </Popup>
  );
}
