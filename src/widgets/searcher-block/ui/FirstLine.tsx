import { Button, TextField } from '@mui/material';

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
    </>
  );
}
