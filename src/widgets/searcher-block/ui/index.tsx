import './index.scss';
import { useEffect, useState } from 'react';

import { useGetSpecialtiesQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';
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
  const [firstLoading, setFirstLoading] = useState(false);

  const getCodeOfSpecialty = (name: string) => data!.find((el) => el.skill === name)!.code;

  const handleClick = () => {
    onClick({
      specialty: specialty ? getCodeOfSpecialty(specialty) : '',
      is_gov: isGovernment,
      is_full_time: isWorkAllDay,
    });
    setFirstLoading(true);
  };
  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список специальностей');
    }
    setFirstLoading(false);
  }, [isError]);
  useEffect(() => {
    if (firstLoading) {
      handleClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoading, isGovernment, isWorkAllDay]);

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
        <Button type="submit" size="s" title="Найти" onClick={handleClick} />
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные" />
      </div>
    </div>
  );
}
