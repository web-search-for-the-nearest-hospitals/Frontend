import './index.scss';
import { useState } from 'react';

import FormStage1 from './FormStage1';
import FormStage2 from './FormStage2';

import { InfoСontainer } from '~/widgets/notification-container';
import { Popup } from '~/shared/ui';

export default function AppointmentForm() {
  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);

  function formSubmit(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setIsOpenInfoСontainer(true);
  }

  return (
    <>
      <div className="appointment-page">
        {formCh === 2 ? (
          <button className="appointment-page__button-back" onClick={() => setFormCh(1)}>
            <span className="appointment-page__arrow-back"> &#8249;</span> Назад
          </button>
        ) : null}

        <form className="form-appointment">
          <h3 className="form-appointment__title">Запись на приём</h3>
          {formCh === 1 ? <FormStage1 setFormCh={setFormCh} /> : <FormStage2 formSubmit={formSubmit} />}
        </form>
      </div>

      <Popup isOpen={isOpenInfoСontainer} closePopup={() => setIsOpenInfoСontainer(false)}>
        <InfoСontainer
          isClose={() => setIsOpenInfoСontainer(false)}
          text={'Ваша запись на прием успешно подтверждена!'}
        />
      </Popup>
    </>
  );
}
