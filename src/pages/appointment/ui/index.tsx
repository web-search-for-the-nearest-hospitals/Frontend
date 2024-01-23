import './index.scss';
import { useState } from 'react';
import { specialtySelect } from '~/entities/clinic';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { Calendar, DropDownInput } from '~/shared/ui';

export default function Appointment() {
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpeciality] = useState<string | null>(specialties[0]?.skill || null);

  return (
    <form className="form-appointment">
      <h3>Запись на приём</h3>
      <DropDownInput
        values={specialties.map((obj) => obj.skill)}
        placeholder="Врач, специальность"
        state={specialty}
        setState={setSpeciality}
        isContentEditable
      />
      <Calendar />
    </form>
  );
}
