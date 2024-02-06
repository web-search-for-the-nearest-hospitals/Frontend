import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Coupons from './Coupons';
import SpecialtyInput from './SpecialtyInput';

import { specialtySelect } from '~/entities/clinic';
import { useLazyGetCouponsOnDayQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Button, Calendar } from '~/shared/ui';
import { ICoupon } from '~/shared/lib/types/interfaces';

interface IFormStage1 {
  setFormCh: (val: 1 | 2) => void;
  setTimeId: (val: string) => void;
}

export default function FormStage1({ setFormCh, setTimeId }: IFormStage1) {
  const { clinicId } = useParams();
  const specialties = useAppSelector(specialtySelect);

  const [specialty, setSpecialty] = useState<string | null>(specialties[0]?.skill || null);
  const [selectedCoupon, setSelectedCoupon] = useState<null | ICoupon>(null);
  const [dateOfAppointment, setDateOfAppointment] = useState<null | string>(null);

  const [triggerQuery, queryResult] = useLazyGetCouponsOnDayQuery();
  const { isError, currentData, isFetching } = queryResult;

  // Крючок получения талонов
  useEffect(() => {
    queryResult.data = undefined; // @TODO возможно так нельзя
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

  useEffect(() => {
    if (selectedCoupon) {
      setTimeId(selectedCoupon.id.toString());
    }
  }, [selectedCoupon, setTimeId]);

  return (
    <section className="form-appointment__ch1">
      <div className="form-appointment__drop-down-container">
        <SpecialtyInput specialty={specialty} setSpecialty={setSpecialty} />
      </div>
      <div className="form-appointment__calendar-container">
        <Calendar setDate={setDateOfAppointment} />
      </div>
      <Coupons couponsData={queryResult} selectedCoupon={selectedCoupon} setSelectedCoupon={setSelectedCoupon} />
      <div className="form-appointment__button-container">
        <Button
          title="Далее"
          type="button"
          size="forForm"
          disabled={isError || currentData?.length === 0 || isFetching}
          onClick={() => setFormCh(2)}
        />
      </div>
    </section>
  );
}
