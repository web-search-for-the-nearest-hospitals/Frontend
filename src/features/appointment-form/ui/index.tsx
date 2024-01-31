import './index.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState, MouseEventHandler } from 'react';
import { specialtySelect } from '~/entities/clinic';
import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Button, Calendar, DropDownInput, InputForm, Checkbox } from '~/shared/ui';
import Coupons from './Coupons';

export default function AppointmentForm() {
  const { specialtyId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpecialty] = useState<string | null>(specialties[0]?.skill || null);
  const [date, setDate] = useState<null | string>(null);
  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();
  const { clinicId } = useParams();
  const [stateCheckbox, setStateCheckbox] = useState<boolean>(false);
  const [buttonSubmit, setButtonSubmit] = useState<boolean>(true);
  const regex = {
    name: '^[А-Яа-яёa-zA-Z \\-]+$',
    email: '^\\S+@\\S+\\.\\S+$',
    // tel: '/^+?[(]?[0-9]{3}[)]?[ ]?[0-9]{3}[ ]?[0-9]{2}[ ]?[0-9]{2}$/v',
  };

  useEffect(() => {
    queryResult.data = undefined;
    const code = specialties.find((el) => el.skill === specialty)?.code;
    if (date && code && clinicId) {
      triggerQuery({
        id: clinicId,
        spec_code: code,
        which_date: date,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerQuery, date, specialty, clinicId, specialties]);

  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || null);
    }
  }, [specialties, specialtyId]);

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
          {formCh === 1 ? (
            <section className="form-appointment__ch1">
              <div className="form-appointment__drop-down-container">
                <DropDownInput
                  values={specialties.map((obj) => obj.skill)}
                  placeholder="Врач, специальность"
                  state={specialty}
                  setState={setSpecialty}
                  isContentEditable
                />
              </div>
              <div className="form-appointment__calendar-container">
                <Calendar setDate={setDate} />
              </div>
              {queryResult.isLoading ? <p>Загружаю доступные ячейки записи</p> : null}
              {queryResult.isError ? <p>Так далеко в будущее мы не заглядываем</p> : null}
              {queryResult.currentData?.length === 0 && !queryResult.isError ? <p>Похоже талонов нет...</p> : null}
              {queryResult.currentData?.length ? <Coupons couponsData={queryResult.currentData} /> : null}
              <div className="form-appointment__button-container">
                <Button
                  title="Далее"
                  type="button"
                  size="forForm"
                  disabled={queryResult.isError || queryResult.currentData?.length === 0}
                  onClick={() => setFormCh(2)}
                />
              </div>
            </section>
          ) : null}

          {formCh === 2 ? (
            <section className="form-appointment__ch2">
              <InputForm
                type={'text'}
                name={'surname'}
                title={'Фамилия'}
                placeholder={'Иванов'}
                minLength={2}
                maxLength={27}
                pattern={regex.name}
              />
              <InputForm
                type={'text'}
                name={'name'}
                title={'Имя'}
                placeholder={'Иван'}
                minLength={2}
                maxLength={27}
                pattern={regex.name}
              />

              <InputForm
                type={'text'}
                name={'fatherName'}
                title={'Отчество'}
                placeholder={'Иванович'}
                minLength={2}
                maxLength={27}
                pattern={regex.name}
              />
              <InputForm
                type={'tel'}
                name={'tel'}
                title={'Номер телефона'}
                placeholder={'+7 (900) 809 00 50'}
                // minLength={5}
                // maxLength={16}
                // pattern={regex.tel}
              />

              <label className="form-appointment__consent" onClick={handleCheckboxConsent}>
                <Checkbox state={stateCheckbox} setState={setStateCheckbox} title={''} />
                <p className="form-appointment__consent-text">
                  Я соглашаюсь с условиями использования сайта и даю согласие на обработку своих персональных данных в
                  соответствии сполитикой обработки персональных данных.
                </p>
              </label>
              <div className="form-appointment__button-container">
                <Button title="Записаться" size="forForm" disabled={buttonSubmit} />
              </div>
            </section>
          ) : null}
        </form>
      </div>
    </>
  );
}
