import './Checkbox.scss';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface ICheckBoxProps {
  color: string;
  onChangeValue: (event: string) => void;
  label: string;
  variant?: string;
}

const CheckBox = ({ color, onChangeValue, label, variant }: ICheckBoxProps) => {
  const [age, setValue] = useState('');

  const handleChangeValue = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChangeValue(selectedValue);
  };

  return (
    <FormControlLabel
      className={'checkbox_variant_' + variant}
      sx={{
        marginTop: '16px',
      }}
      control={
        <Checkbox
          value={age}
          sx={{
            color: color,
            marginTop: '0px',
            minWidth: '100px',
            height: '50px',
            borderRadius: '20px',
          }}
          onChange={handleChangeValue}
        />
      }
      label={label}
    />
  );
};

export default CheckBox;
