import './index.scss';
import { useState } from 'react';

import { Button, Checkbox, DropDownInput } from '~/shared/ui/index';

const specialties = ['Терапевт', 'Офтальмолог', 'Хирург', 'Отоларинголог'];
// @TODO: заменить на данные с бэка

export default function Searcher() {
  const [specialty, setSpeciality] = useState<string | null>(null);
  const [isWorkAllDay, setIsWorkAllDay] = useState(false);
  const [isGovernment, setIsGovernment] = useState(false);

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
