import './index.scss';
import { useState } from 'react';

import { specialtySelect } from '~/entities/clinic';

import { useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput } from '~/shared/ui/index';

interface ISearcher {
  onClick: (data: IGetOrganizations) => void;
}

export default function Searcher({ onClick }: ISearcher) {
  const specialties = useAppSelector(specialtySelect);
  const [specialty, setSpeciality] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);

  const getCodeOfSpecialty = (name: string) => specialties.find((el) => el.skill === name)!.code;

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={specialties.map((obj) => obj.skill)}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpeciality}
          isContentEditable
        />
        <Button
          type="submit"
          size="s"
          title="Найти"
          onClick={() =>
            onClick({
              specialty: specialty ? getCodeOfSpecialty(specialty) : '',
              is_gov: isGovernment,
              is_full_time: isWorkAllDay,
            })
          }
        />
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные" />
      </div>
    </div>
  );
}
