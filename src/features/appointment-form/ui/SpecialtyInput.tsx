import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { specialtySelect } from '~/entities/clinic';
import { useGetOrganizationByIdQuery } from '~/shared/api/rtkqueryApi';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import createToast from '~/shared/lib/toast/createToast';
import { DropDownInput } from '~/shared/ui';

interface ISpecialtyInput {
  specialty: string | null;
  setSpecialty: (val: string | null) => void;
}

export default function SpecialtyInput({ specialty, setSpecialty }: ISpecialtyInput) {
  const { clinicId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const { data, isLoading, isError } = useGetOrganizationByIdQuery(clinicId || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const [specialtyId] = useState(searchParams.get('specialty'));

  useEffect(() => {
    if (isError) createToast('error', 'Не удалось получить данные о клинике');
    if (data?.specialties.length) createToast('success', 'Данные о специальностях в клинике получены');
    if (data?.specialties.length === 0)
      createToast(
        'info',
        'Не удалось получить специальности врачей в данной клинике. Будут отражены все специальности',
      );
  }, [data, isError]);

  // крючок установки начального стейта для DropDownInput
  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || null);
    }
  }, [setSpecialty, specialties, specialtyId]);

  // крючок смены queryParams
  useEffect(() => {
    if (specialty) setSearchParams({ specialty });
  }, [specialty, setSearchParams]);

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
