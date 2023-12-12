import './index.scss';
import { useEffect } from 'react';

import DropDown from '~/shared/ui/DropDown/DropDown';
import { clinics, doctors } from '../lib/const';
import { useFilters } from '../module/useFilters';
import FirstLine from './FirstLine';
import FormControl from './FormControl';

export default function Searcher() {
  const { handleChangeClinic, handleChangeDoctor, handleInputChange, clinic, doctor, searchClinic } = useFilters();

  useEffect(() => {
    console.log(searchClinic);
    console.log(clinic);
    console.log(doctor);
  }, [searchClinic, clinic, doctor]);

  // @TODO: переписать без MUI
  return (
    <div className="search-clinic">
      <div>
        <FirstLine onCh={handleInputChange} val={searchClinic} />
      </div>
      <FormControl />
      <div>
        <DropDown values={clinics} onChangeValue={handleChangeClinic} label={'Государственные'} />
        <DropDown values={doctors} onChangeValue={handleChangeDoctor} label={'Врач, специализация'} />
      </div>
    </div>
  );
}
