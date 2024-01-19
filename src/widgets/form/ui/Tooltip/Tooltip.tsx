import './Tooltip.scss';
import { Button, CloseButton } from '~/shared/ui/index';

import { NavLink } from 'react-router-dom';

interface ITooltip {
  isClose: () => void;
  text: string;
}

export function Tooltip({ isClose, text }: ITooltip) {
  function navigateToMain() {
    isClose();
  }
  return (
    <div className="tooltip">
      <CloseButton type="button" onClick={isClose} size={'s'} />
      <p className="tooltip__text">{text}</p>
      <NavLink to="/clinic-searcher/main">
        <Button title="На главную" size="s" type="submit" onClick={navigateToMain} />
      </NavLink>
    </div>
  );
}
