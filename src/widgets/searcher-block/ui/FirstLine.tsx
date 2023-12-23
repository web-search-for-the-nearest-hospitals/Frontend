import { TextField } from '@mui/material';
import SbtBtn from '~/shared/ui/SbtBtn/SbtBtn';
interface IFirstLine {
  onCh: (event: React.ChangeEvent<HTMLInputElement>) => void;
  val: string;
}

export default function FirstLine({ val, onCh }: IFirstLine) {
  return (
    <>
      <TextField
        value={val}
        onChange={onCh}
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
      <SbtBtn />
    </>
  );
}
