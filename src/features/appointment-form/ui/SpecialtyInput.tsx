import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { specialtySelect } from '~/entities/clinic';
import { useGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import createToast from '~/shared/lib/toast/createToast';
import { DropDownInput } from '~/shared/ui';

interface ISpecialtyInput {
  specialty: string | null;
  setSpecialty: (val: string) => void;
}

export default function SpecialtyInput({ specialty, setSpecialty }: ISpecialtyInput) {
  const { clinicId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const { data, isLoading, isError } = useGetOrganizationByIdQuery(clinicId || '');

  useEffect(() => {
    if (isError) createToast('error', 'Не удалось получить данные о клинике');
    if (data?.specialties.length) createToast('success', 'Данные о специальностях в клинике получены');
    if (data?.specialties.length === 0)
      createToast(
        'info',
        'Не удалось получить специальности врачей в данной клинике. Будут отражены все специальности',
      );
  }, [data, isError]);

  useEffect(() => {
    if (specialties[0]) {
      setSpecialty(specialties[0].skill);
    }
  }, [setSpecialty, specialties]);

  return isLoading ? (
    <p> Загружаю специальности</p>
  ) : (
    <DropDownInput
      values={(data?.specialties.length ? data.specialties : specialties).map((obj) => obj.skill)}
      placeholder="Врач, специальность"
      state={specialty}
      setState={setSpecialty}
      isContentEditable
    />
  );
}
