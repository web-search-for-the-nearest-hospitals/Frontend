import './index.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Coupons from './Coupons';
import SpecialtyInput from './SpecialtyInput';

import { InfoСontainer } from '~/widgets/notification-container';
import { specialtySelect } from '~/entities/clinic';

import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { Button, Calendar, Popup } from '~/shared/ui';
import { ICoupon } from '~/shared/lib/types/interfaces';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';

// TODO@: нужно вынести крючки в хук, но после того, как будет собрана полная форма
export default function AppointmentForm() {
  const { clinicId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const [searchParams, setSearchParams] = useSearchParams();
  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();

  const [specialtyId] = useState(searchParams.get('specialty'));
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [dateOfAppointment, setDateOfAppointment] = useState<null | string>(null);

  const [formCh, setFormCh] = useState<1 | 2>(1);
  const [isOpenInfoСontainer, setIsOpenInfoСontainer] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<null | ICoupon>(null);

  function formSubmit(evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    setIsOpenInfoСontainer(true);
  }

  // Крючок получения талонов
  useEffect(() => {
    queryResult.data = undefined;
    const code = specialties.find((el) => el.skill === specialty)?.code;
    if (dateOfAppointment && code && clinicId) {
      triggerQuery({
        id: clinicId,
        spec_code: code,
        which_date: dateOfAppointment,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerQuery, dateOfAppointment, specialty, clinicId, specialties]);

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

  return (
    <>
      <form className="form-appointment">
        <h3 className="form-appointment__title">Запись на приём</h3>
        {formCh === 1 ? (
          <section className="form-appointment__ch1">
            <div className="form-appointment__drop-down-container">
              <SpecialtyInput specialty={specialty} setSpecialty={setSpecialty} />
            </div>
            <div className="form-appointment__calendar-container">
              <Calendar setDate={setDateOfAppointment} />
            </div>
            <Coupons couponsData={queryResult} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} />
          </section>
        ) : null}
        {formCh === 2 ? <section>Здесь 2-я часть формы</section> : null}
        <div className="form-appointment__button-containter">
          <Button title="Назад" type="button" size="s" disabled={formCh === 1} onClick={() => setFormCh(1)} />
          {formCh === 1 ? (
            <Button title="Далее" type="button" size="s" disabled={!selectedCoupon} onClick={() => setFormCh(2)} />
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
