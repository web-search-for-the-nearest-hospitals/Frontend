import './index.scss';
import { useState } from 'react';

import { Button, DropDownMenu, Checkbox } from '~/shared/ui/index';

const specialties = ['Терапевт', 'Офтальмолог', 'Хирург', 'Отоларинголог'];
// @TODO: заменить на данные с бэка

export default function Searcher() {
  const [specialty, setSpeciality] = useState(specialties[0]!);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <DropDownMenu values={specialties} placeholder="Врач, специальность" setState={setSpeciality}></DropDownMenu>
        <Button value={specialty} type="submit" size="s" title="Найти" />
      </div>
      <div className="search-clinic__group">
        <Checkbox state={isWorkAllDay} setState={setIsWorkAllDay} title="Круглосуточные"></Checkbox>
        <Checkbox state={isGovernment} setState={setIsGovernment} title="Государственные"></Checkbox>
      </div>
    </div>
  );
}
