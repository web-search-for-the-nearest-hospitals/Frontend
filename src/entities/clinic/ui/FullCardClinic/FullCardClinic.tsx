import './FullCardClinic.scss';
import { Button, CloseButton } from '~/shared/ui/index';
import { IOrganization } from '~/shared/lib/types/interfaces';

interface IFullCard {
  isClose: () => void;
  clinic: IOrganization;
}

export function FullCardClinic({ isClose, clinic }: IFullCard) {
  function getDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isPhone = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    if (isPhone) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="clinic-popup">
      <CloseButton type="button" onClick={isClose} />
      <h3 className="clinic-popup__name">{clinic.short_name}</h3>
      <p className="clinic-popup__about">{clinic.about}</p>
      <div className="clinic-popup__timetable">
        <p className="clinic-popup__timetable-title">График работы:</p>

        {/* TODO@: заменить, когда появится функция парсер */}
        <p className="clinic-popup__timetable-period">{'Пн-Пт: 8:00–17:00 Сб-Вс: Выходной'}</p>
        {/* <p className="clinic-popup__timetable-period">{clinic.timetable}</p> */}
      </div>
      <div className="clinic-popup__address">
        <p className="clinic-popup__address-text">
          <span className="clinic-popup__address-title">Адрес:</span>
          {clinic.factual_address}
        </p>
      </div>
      <div className="clinic-popup__phone">
        <p className="clinic-popup__phone-title">Телефон: </p>
        {getDevice() ? (
          <a className="clinic-popup__phone-number clinic-popup__phone-number_active" href={`tel:${clinic.phone}`}>
            {clinic.phone}
          </a>
        ) : (
          <p className="clinic-popup__phone-number">{clinic.phone}</p>
        )}
      </div>
      <div className="clinic-popup__site">
        <p className="clinic-popup__site-title">Сайт: </p>
        <a className="clinic-popup__site-link" href={clinic.site} target="_blank" rel="noopener noreferrer">
          {clinic.site}
        </a>
      </div>
      <Button title="Записаться" size="m" type="submit" />
    </div>
  );
}
