import './index.scss';
import { useRef, useState } from 'react';

import FormStage1 from './FormStage1';
import FormStage2 from './FormStage2';

import { InfoСontainer } from '~/widgets/notification-container';
import { Popup } from '~/shared/ui';

export default function AppointmentForm() {
  const ref = useRef<null | HTMLFormElement>(null);
  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);

  function formSubmit(evt: React.FormEvent<HTMLFormElement>) {
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

        {/* браузерная валидация работает стабильнее кастомной на текущем этапе */}
        {/* логику формы нужно продумать, чтобы корректно и без багов заменить кастомом */}
        <form className="form-appointment" ref={ref} onSubmit={formSubmit}>
          <h3 className="form-appointment__title">Запись на приём</h3>
          {formCh === 1 ? <FormStage1 setFormCh={setFormCh} /> : <FormStage2 />}
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
