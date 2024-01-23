import './FullCardClinic.scss';
import { Button, CloseButton, TimetableList } from '~/shared/ui/index';
import { IOrganization } from '~/shared/lib/types/interfaces';

interface IFullCard {
  isClose: () => void;
  clinic: IOrganization;
}

export function FullCardClinic({ isClose, clinic }: IFullCard) {
  return (
    <div className="clinic-popup">
      <CloseButton type="button" onClick={isClose} />
      <h3 className="clinic-popup__name">{clinic.short_name}</h3>
      <p className="clinic-popup__about">{clinic.about}</p>
      <div className="clinic-popup__timetable">
        <p className="clinic-popup__timetable-title">График работы:</p>
        {TimetableList(clinic, 'popup')}
        {/* <p className="clinic-popup__timetable-period"></p> */}
      </div>
      <div className="clinic-popup__address">
        <p className="clinic-popup__address-text">
          <span className="clinic-popup__address-title">Адрес:</span>
          {clinic.factual_address}
        </p>
      </div>
      <div className="clinic-popup__phone">
        <p className="clinic-popup__phone-title">Телефон: </p>
        <p className="clinic-popup__phone-number">{clinic.phone}</p>
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
