import './index.scss';
import { Button, CloseButton } from '~/shared/ui/index';

import { NavLink } from 'react-router-dom';

interface IInfoСontainer {
  isClose: () => void;
  text: string;
}

export function InfoСontainer({ isClose, text }: IInfoСontainer) {
  function navigateToMain() {
    isClose();
  }
  return (
    <div className="info-container">
      <CloseButton type="button" onClick={isClose} size={'s'} />
      <p className="info-container__text">{text}</p>
      <NavLink to="/clinic-searcher/main" className="info-container__link">
        <Button title="На главную" size="s" type="submit" onClick={navigateToMain} />
      </NavLink>
    </div>
  );
}
