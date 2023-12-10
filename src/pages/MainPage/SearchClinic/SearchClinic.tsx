import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DropDown from '~/shared/ui/DropDown/DropDown';
import { useState } from 'react';
import './SearchClinic.scss';

export default function SearchClinic() {
  const [searchClinic, setSearchClinic] = useState('');
  const [clinic, setClinic] = useState('');
  const [doctor, setDoctor] = useState('');

  const clinics = ['Государственная', 'Частная'];
  const doctors = ['Терапевт', 'Хирург', 'Стоматолог', 'Лор', 'Психиатр'];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchClinic(event.target.value);
  };

  const handleChangeClinic = (data: string) => {
    setClinic(data);
  };

  const handleChangeDoctor = (data: string) => {
    setDoctor(data);
  };

  console.log(searchClinic);
  console.log(clinic);
  console.log(doctor);

  return (
    <div className="search-clinic">
      <div>
        <TextField
          value={searchClinic}
          onChange={handleInputChange}
          id="outlined-basic"
          variant="outlined"
          placeholder="Поиск"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '20px',
              width: '560px',
              height: '50px',
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#C4BFBF',
            marginLeft: '30px',
            width: '100px',
            height: '50px',
            borderRadius: '20px',
          }}
        >
          Найти
        </Button>
      </div>
      <FormControlLabel
        control={<Checkbox color="default" defaultChecked />}
        sx={{
          color: '#C4BFBF',
          marginTop: '16px',
          minWidth: '100px',
          height: '50px',
          borderRadius: '20px',
        }}
        label="Круглосуточные клиники"
      />
      <div>
        <DropDown values={clinics} onChangeValue={handleChangeClinic} label={'Государственные'} />
        <DropDown values={doctors} onChangeValue={handleChangeDoctor} label={'Врач, специализация'} />
      </div>
    </div>
  );
}
