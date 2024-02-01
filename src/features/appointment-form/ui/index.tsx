import './index.scss';

import { useState, MouseEventHandler } from 'react';

import { Popup } from '~/shared/ui';
import { InfoСontainer } from '~/widgets/notification-container';
import FormStage1 from './form-stage1/FormStage1';
import FormStage2 from './form-stage2/FormStage2';

export default function AppointmentForm() {
  const [formCh, setFormCh] = useState<1 | 2>(1);

  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);
  const [stateCheckbox, setStateCheckbox] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(true);

  function formSubmit(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setIsOpenInfoСontainer(true);
    console.log(evt);
  }
  const handleCheckboxConsent: MouseEventHandler = (e) => {
    const form = e.currentTarget.closest('form');
    if (form?.checkValidity() && !stateCheckbox) {
      setButtonSubmit(false);
    } else setButtonSubmit(true);
  };

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
          {formCh === 1 ? <FormStage1 setFormCh={setFormCh} /> : null}
          {formCh === 2 ? (
            <FormStage2
              handleCheckboxConsent={handleCheckboxConsent}
              stateCheckbox={stateCheckbox}
              setStateCheckbox={setStateCheckbox}
              buttonSubmit={buttonSubmit}
              formSubmit={formSubmit}
            />
          ) : null}
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
