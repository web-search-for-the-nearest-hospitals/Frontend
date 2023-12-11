import { Checkbox, FormControlLabel } from '@mui/material';

export default function FormControl() {
  return (
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
  );
}
