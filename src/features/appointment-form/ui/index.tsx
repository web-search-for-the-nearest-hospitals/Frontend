import './index.scss';
import { useEffect, useState } from 'react';

import FormStage1 from './FormStage1';
import FormStage2 from './FormStage2';

import { InfoСontainer } from '~/widgets/notification-container';
import { Popup } from '~/shared/ui';
import { useLazyAppointmentUserQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';

export default function AppointmentForm() {
  const [triggerQuery, { isError, isFetching, data }] = useLazyAppointmentUserQuery();
  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('');
  const [timeId, setTimeId] = useState('');

  function formSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    triggerQuery({ fio, id: timeId, phone });
  }

  useEffect(() => {
    if (isError) createToast('error', 'Не удалось записать вас на приём');
    if (isFetching) createToast('info', 'Подождите пожалуйста');
    if (data) setIsOpenInfoСontainer(true);
  }, [data, isError, isFetching]);

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
        <form className="form-appointment" onSubmit={formSubmit}>
          <h3 className="form-appointment__title">Запись на приём</h3>
          {formCh === 1 ? (
            <FormStage1 setFormCh={setFormCh} setTimeId={setTimeId} />
          ) : (
            <FormStage2 setFio={setFio} setPhone={setPhone} />
          )}
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
