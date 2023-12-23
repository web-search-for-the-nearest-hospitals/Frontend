import { Button } from '@mui/material';
import './SbtBtn.scss';

interface ISbtBtn {
  onSubmit?: (event: string) => void;
  variant?: string;
}
const SbtBtn = ({ variant }: ISbtBtn) => {
  return (
    <>
      <Button
        className={'sbtbtn sbtbtn_variant_' + variant}
        variant="contained"
        sx={{
          //backgroundColor: '#C4BFBF',
          marginLeft: '30px',
          width: '100px',
          height: '50px',
          borderRadius: '20px',
        }}
        //onClick={onSubmit}
      >
        Найти
      </Button>
    </>
  );
};
export default SbtBtn;
