import './index.scss';
import { useEffect, useState } from 'react';
import { useGetSpecialtiesQuery } from '~/shared/api/rtkqueryApi';
import { createToast } from '~/shared/lib';

import { Button, Checkbox, DropDownInput } from '~/shared/ui/index';

const specialties = ['Терапевт', 'Офтальмолог', 'Хирург', 'Отоларинголог'];
// @TODO: заменить на данные с бэка

export default function Searcher() {
  const [specialty, setSpeciality] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);
  const { data, isLoading, isError } = useGetSpecialtiesQuery(null);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список специальностей');
    } else if (data) {
      console.log(data);
    }
  }, [isError, data]);

  if (isLoading) {
    return <p className="search-clinic">Загружаю список специальностей</p>;
  }

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownInput
          values={specialties}
          placeholder="Врач, специальность"
          state={specialty}
          setState={setSpeciality}
          contentEditable
        />
        <Button type="submit" size="s" title="Найти" onClick={() => console.log('i work')} />
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные" />
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные" />
      </div>
    </div>
  );
}
