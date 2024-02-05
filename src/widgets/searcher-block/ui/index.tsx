import './index.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { specialtySelect } from '~/entities/clinic';
import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { UserIcon } from '~/shared/assets/index';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput, IconBtn } from '~/shared/ui/index';
import { userSelect } from '~/entities/user';

interface ISearcher {
  onSearch: (data: IGetOrganizations) => void;
}

export default function Searcher({ onSearch }: ISearcher) {
  const nav = useNavigate();
  const specialties = useAppSelector(specialtySelect);
  const { latitude, longitude } = useAppSelector(userSelect);
  const [searchParams, setSearchParams] = useSearchParams();

  const [specialtyId] = useState(searchParams.get('specialty'));
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(searchParams.get('isWorkAllDay') === 'true');
  const [isGoverment, setIsGoverment] = useState(searchParams.get('isGoverment') === 'true');
  const [firstLoading, setFirstLoading] = useState(false);

  const getCodeOfSpecialty = useCallback(
    (name: string) => specialties.find((el) => el.skill === name)!.code,
    [specialties],
  );

  const handleSumbit = useCallback(() => {
    onSearch({
      specialty: specialty ? getCodeOfSpecialty(specialty) : '',
      is_gov: isGoverment,
      is_full_time: isWorkAllDay,
      lat: latitude || undefined,
      long: longitude || undefined,
    });
    setFirstLoading(true);
  }, [getCodeOfSpecialty, isGoverment, isWorkAllDay, latitude, longitude, onSearch, specialty]);

  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || null);
    }
  }, [specialties, specialtyId]);

  useEffect(() => {
    if (firstLoading) {
      handleSumbit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoading, isGoverment, isWorkAllDay, latitude, longitude]);

  useEffect(() => {
    setSearchParams((prev) => ({ ...prev, specialty, isGoverment, isWorkAllDay }));
  }, [isGoverment, isWorkAllDay, setSearchParams, specialty]);

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={specialties.map((obj) => obj.skill)}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpecialty}
          isContentEditable
        />
        <Button type="submit" size="s" title="Найти" onClick={handleSumbit} />
        {/* На странице присутствуют две кнопки IconBtn(UserIcon),
          при внесении изменений в эту кнопку - изменить вторую /widgets/header/ui/index.tsx */}
        <div className="search-clinic__icon-button">
          <IconBtn onClick={() => nav('/clinic-searcher/signin')}>
            <UserIcon width={33} height={35} />
          </IconBtn>
        </div>
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGoverment} setState={setIsGoverment} title="Государственные" />
      </div>
    </div>
  );
}
