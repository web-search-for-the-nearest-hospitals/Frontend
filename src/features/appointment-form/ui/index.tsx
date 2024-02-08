import './index.scss';
import { useEffect, useState } from 'react';

import FormStage1 from './FormStage1';
import FormStage2 from './FormStage2';

import { InfoСontainer } from '~/widgets/notification-container';
import { Popup } from '~/shared/ui';
import { useLazyAppointmentUserQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';
import { useNavigate } from 'react-router-dom';

export default function AppointmentForm() {
  const nav = useNavigate();
  const [triggerQuery, { isError, isFetching, isSuccess, error }] = useLazyAppointmentUserQuery();
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
    if (isError)
      createToast(
        'error',
        'Не удалось записать вас на приём: ' + (error as { data: { detail: string } })?.data?.detail,
      );
    if (isFetching) createToast('info', 'Подождите пожалуйста');
    if (isSuccess) setIsOpenInfoСontainer(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isFetching]);

  // @TODO роут нужно сделать защищённым, а не эти костыли лепить, хотя работает же....
  useEffect(() => {
    if (localStorage.getItem('clinic-searcher-access')) {
      createToast(
        'info',
        'Если с момента последнего входа прошло более суток - войдите пожалуйста снова, иначе не получится записаться на приём',
      );
    } else {
      createToast('info', 'Вы не авторизованы, вы не сможете записаться на приём без авторизации');
      nav('/clinic-searcher/signin');
    }
  });

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
          closePopup={() => setIsOpenInfoСontainer(false)}
          text={'Ваша запись на прием успешно подтверждена!'}
        />
      </Popup>
    </>
  );
}
