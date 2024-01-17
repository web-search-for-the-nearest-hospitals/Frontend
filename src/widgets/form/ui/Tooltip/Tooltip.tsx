import './Tooltip.scss';
import { Button, CloseButton } from '~/shared/ui/index';

import { useNavigate } from 'react-router-dom';

interface ITooltip {
  isClose: () => void;
}

export function Tooltip({ isClose }: ITooltip) {
  const navigate = useNavigate();

  function navigateToMain() {
    navigate('/');
    isClose();
  }
  return (
    <div className="tooltip">
      <CloseButton type="button" onClick={isClose} size={'s'} />
      <p className="tooltip__text">Ваша запись на рассмотрении. Администратор свяжется с вами для уточнения записи.</p>
      <Button title="На главную" size="s" type="submit" onClick={navigateToMain} />
    </div>
  );
}
