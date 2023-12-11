import DropDown from '~/shared/ui/DropDown/DropDown';
import { clinics, doctors } from '../lib/const';
import { useFilters } from '../module/useFilters';
import './SearchClinic.scss';
import FirstLine from './FirstLine';
import FormControl from './FormControl';
import { useEffect } from 'react';

export default function SearchClinic() {
  const { handleChangeClinic, handleChangeDoctor, handleInputChange, clinic, doctor, searchClinic } = useFilters();

  useEffect(() => {
    console.log(searchClinic);
    console.log(clinic);
    console.log(doctor);
  }, [searchClinic, clinic, doctor]);

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
