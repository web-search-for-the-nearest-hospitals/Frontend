import './FullCardClinic.scss';
import { Popup, Button, CloseButton } from '~/shared/ui/index';
import { clinic } from '~/shared/api/constants';

interface IFullCardClinic {
  isOpenPopup: boolean;
  setIsOpenPopup: (newVal: boolean) => void;
  onClickButton: () => void;
}

export function FullCardClinic({ isOpenPopup, setIsOpenPopup, onClickButton }: IFullCardClinic) {
  // @TODO на экране меньше 625px должно превращаться в отдельную страницу
  return (
    <Popup isOpen={isOpenPopup}>
      <div className="clinic-popup">
        <CloseButton type="button" onClick={() => setIsOpenPopup(false)} />
        <h3 className="clinic-popup__name">{clinic.name}</h3>
        <p className="clinic-popup__about">{clinic.about}</p>
        <div className="clinic-popup__timetable">
          <p className="clinic-popup__timetable-title">График работы:</p>
          <p className="clinic-popup__timetable-period">{clinic.timetable}</p>
        </div>
        <div className="clinic-popup__address">
          <p className="clinic-popup__address-text">
            <span className="clinic-popup__address-title">Адрес:</span>
            {clinic.address}
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
        <Button title="Записаться" size="l" type="submit" onClick={onClickButton} />
      </div>
    </Popup>
  );
}
