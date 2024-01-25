import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import { useCallback, useEffect, useState } from 'react';

import { specialtySelect } from '~/entities/clinic';

import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput } from '~/shared/ui/index';

interface ISearcher {
  onSearch: (data: IGetOrganizations) => void;
  onReset: () => void;
}

export default function Searcher({ onSearch, onReset }: ISearcher) {
  const { specialtyId } = useParams();
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpecialty] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);
  const nav = useNavigate();

  const getCodeOfSpecialty = useCallback(
    (name: string) => specialties.find((el) => el.skill === name)!.code,
    [specialties],
  );

  const handleReset = () => {
    setIsGovernment(false);
    setIsWorkAllDay(false);
    setSpecialty(null);
    onReset();
  };

  const updateUrl = useCallback(() => nav(`/clinic-searcher/main/${specialty}`), [nav, specialty]);

  const handleSumbit = useCallback(() => {
    onSearch({
      specialty: specialty ? getCodeOfSpecialty(specialty) : '',
      is_gov: isGovernment,
      is_full_time: isWorkAllDay,
    });
  }, [getCodeOfSpecialty, isGovernment, isWorkAllDay, onSearch, specialty]);

  // дублируется в форме, но выносить дубликат дороже выйдет. В сомнениях.
  useEffect(() => {
    if (specialtyId && specialtyId !== 'null') {
      const val = specialties.find((el) => el.skill.toLowerCase() === specialtyId.toLowerCase())?.skill;
      setSpecialty(val || null);
    }
  }, [specialties, specialtyId]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  useEffect(() => {
    if (specialty) {
      handleSumbit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGovernment, isWorkAllDay, specialty]);

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
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные" />
        <Button type="submit" size="s" title="Cброс" onClick={handleReset} />
      </div>
    </div>
  );
}
