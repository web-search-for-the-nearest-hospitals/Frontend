import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { specialtySelect } from '~/entities/clinic';
import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Button, Calendar, DropDownInput } from '~/shared/ui';
import Coupons from '../coupons/Coupons';

interface IFormStage1 {
  setFormCh: (value: 1 | 2) => void;
}

export default function FormStage1({ setFormCh }: IFormStage1) {
  const { specialtyId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpecialty] = useState<string | null>(specialties[0]?.skill || null);
  const [date, setDate] = useState<null | string>(null);
  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();
  const { clinicId } = useParams();

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

  return (
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
  );
}
