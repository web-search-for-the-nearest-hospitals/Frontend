import './index.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { specialtySelect } from '~/entities/clinic';
import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Button, Calendar, DropDownInput, Popup } from '~/shared/ui';
import Coupons from './Coupons';
import { InfoСontainer } from '~/widgets/notification-container';

export default function AppointmentForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const specialties = useAppSelector(specialtySelect);
  const [specialtyId] = useState(searchParams.get('specialty'));
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [date, setDate] = useState<null | string>(null);
  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();
  const { clinicId } = useParams();
  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);

  // Крючок получения талонов
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

  // крючок установки начального стейта для DropDownInput
  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || specialties[0]?.skill || null);
    }
  }, [specialties, specialtyId]);

  // крючок смены queryParams
  useEffect(() => {
    if (specialty) setSearchParams({ specialty });
  }, [specialty, setSearchParams]);

  function formSubmit(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setIsOpenInfoСontainer(true);
  }
  return (
    <>
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
          </section>
        ) : null}
        {formCh === 2 ? <section>Здесь 2-я часть формы</section> : null}
        <div className="form-appointment__button-containter">
          <Button title="Назад" type="button" size="s" disabled={formCh === 1} onClick={() => setFormCh(1)} />
          {formCh === 1 ? (
            <Button
              title="Далее"
              type="button"
              size="s"
              disabled={queryResult.isError || queryResult.currentData?.length === 0}
              onClick={() => setFormCh(2)}
            />
          ) : null}
          {formCh === 2 ? (
            <Button
              title="Отправить"
              size="s"
              onClick={(evt: React.ChangeEvent<HTMLInputElement>) => formSubmit(evt)}
            />
          ) : null}
        </div>
      </form>
      <Popup isOpen={isOpenInfoСontainer} closePopup={() => setIsOpenInfoСontainer(false)}>
        <InfoСontainer
          isClose={() => setIsOpenInfoСontainer(false)}
          text={'Ваша запись на прием успешно подтверждена!'}
        />
      </Popup>
    </>
  );
}
