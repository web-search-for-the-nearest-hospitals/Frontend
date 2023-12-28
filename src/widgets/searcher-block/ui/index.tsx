import './index.scss';
import { useState } from 'react';
import SubmitButton from '~/shared/ui/SubmitButton/SubmitButton';
import SearchInput from '~/shared/ui/SearchInput/SearchInput';
import Checkbox from '~/shared/ui/Checkbox/Checkbox';
import { specialties } from '../lib/consts';

export default function Searcher() {
  const [specialty, setSpeciality] = useState(specialties[0]!);
  const [allDay, setAllDay] = useState(false);
  const [civil, setCivil] = useState(false);

  return (
    <div className="search-clinic">
      <div className="search-clinic__container">
        <SearchInput values={specialties} state={specialty} setState={setSpeciality}></SearchInput>
        <SubmitButton value={specialty} title="Найти" />
      </div>
      <div className="search-clinic__group">
        <Checkbox state={allDay} setState={setAllDay} title="Круглосуточные"></Checkbox>
        <Checkbox state={civil} setState={setCivil} title="Государственные"></Checkbox>
      </div>
    </div>
  );
}
