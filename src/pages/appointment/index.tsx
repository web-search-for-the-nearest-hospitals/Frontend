import styles from './index.module.scss';
import { useState } from 'react';
import { Checkbox } from '~/shared/ui';
import FormAppointment from '~/widgets/form-appointment';
// import { useSelector } from 'react-redux';
// import { RootState } from '~/app/store/store';

export default function AppointmentPage() {
  const [approval, setApproval] = useState(false);

  //const formData = useSelector((state: RootState) => state.appointment.formData);

  const changeConsent = () => {
    setApproval((prevVal) => !prevVal);
  };

  return (
    <section className={styles['appointment-page']}>
      <h1 className={styles['appointment-page__heading']}>Запись на приём</h1>
      <FormAppointment />
      <Checkbox state={approval} setState={changeConsent}>
        <p className={styles['appointment-page__checkbox-label']}>
          Я соглашаюсь с условиями использования сайта и&nbsp;даю&nbsp;согласие на обработку своих персональных данных в
          соответствии с политикой обработки персональных данных.
        </p>
      </Checkbox>
    </section>
  );
}
