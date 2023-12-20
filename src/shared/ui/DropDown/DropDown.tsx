import './DropDown.scss';
import { FC, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IDropDownProps {
  values: string[];
  onChangeValue: (event: string) => void;
  label: string;
  borderRadius?: string;
  backgroundColor?: string;
  variant?: string;
}

const DropDown: FC<IDropDownProps> = ({
  values,
  onChangeValue,
  label,
  backgroundColor = '#F0F0F0',
  variant = 'primary',
}) => {
  const [age, setValue] = useState('');

  const handleChangeValue = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChangeValue(selectedValue);
  };

  return (
    <FormControl className={'storybook-dropDown--' + variant} sx={{ m: 1, minWidth: 255 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={age}
        sx={{
          borderRadius: '15px',
          backgroundColor: backgroundColor,

          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        label="Районы"
        onChange={handleChangeValue}
      >
        {values.map((item: string, index: number) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
