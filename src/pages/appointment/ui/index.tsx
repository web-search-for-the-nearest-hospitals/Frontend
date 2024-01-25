import './index.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { specialtySelect } from '~/entities/clinic';
import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Calendar, DropDownInput } from '~/shared/ui';
import Coupons from './Coupons';

export default function Appointment() {
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpeciality] = useState<string | null>(specialties[0]?.skill || null);
  const [date, setDate] = useState<null | string>(null);
  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();
  const { clinicId } = useParams();

  useEffect(() => {
    const code = specialties.find((el) => el.skill === specialty)?.code;
    if (date && code && clinicId) {
      triggerQuery({
        id: clinicId,
        spec_code: code,
        which_date: date,
      });
    }
  }, [triggerQuery, date, specialty, clinicId, specialties]);

  return (
    <form className="form-appointment">
      <h3 className="form-appointment__title">Запись на приём</h3>
      <div className="form-appointment__drop-down-container">
        <DropDownInput
          values={specialties.map((obj) => obj.skill)}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpeciality}
          isContentEditable
        />
      </div>
      <div className="form-appointment__calendar-container">
        <Calendar setDate={setDate} />
      </div>
      {queryResult.isLoading ? <p>Загружаю доступные ячейки записи</p> : null}
      {queryResult.isError ? <p>Так далеко в будущее мы не заглядываем</p> : null}
      {queryResult.data?.length === 0 && !queryResult.isError ? <p>Похоже талонов нет...</p> : null}
      {queryResult.data?.length ? <Coupons couponsData={queryResult.data} /> : null}
    </form>
  );
}
