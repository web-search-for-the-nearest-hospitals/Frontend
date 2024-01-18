import './index.scss';
import { useEffect, useState } from 'react';

import { useGetSpecialtiesQuery } from '~/shared/api/rtkqueryApi';
import { createToast } from '~/shared/lib';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { Button, Checkbox, DropDownInput } from '~/shared/ui/index';

interface ISearcher {
  onClick: (data: IGetOrganizations) => void;
}

export default function Searcher({ onClick }: ISearcher) {
  const [specialty, setSpeciality] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);
  const { data, isLoading, isError } = useGetSpecialtiesQuery(null);

  const getCodeOfSpecialty = (name: string) => data!.find((el) => el.skill === name)!.code;

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список специальностей');
    }
  }, [isError]);

  if (isLoading || !data) {
    return <p className="search-clinic">Загружаю список специальностей</p>;
  }

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={data.map((obj) => obj.skill)}
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
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay}>
          Круглосуточные
        </Checkbox>
        <Checkbox state={isGovernment} setState={setIsGovernment}>
          Государственные
        </Checkbox>
      </div>
    </div>
  );
}
