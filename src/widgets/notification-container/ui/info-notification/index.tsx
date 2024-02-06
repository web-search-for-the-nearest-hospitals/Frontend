import './index.scss';
import { Button } from '~/shared/ui/index';

import { NavLink, useNavigate } from 'react-router-dom';

interface IInfoСontainer {
  closePopup: () => void;
  text: string;
}

export function InfoСontainer({ closePopup, text }: IInfoСontainer) {
  const nav = useNavigate();
  function navigateToMain() {
    closePopup();
    nav('/clinic-searcher/main/');
  }
  return (
    <div className="info-container">
      <p className="info-container__text">{text}</p>
      <NavLink to="/clinic-searcher/main" className="info-container__link">
        <Button title="На главную" size="s" type="submit" onClick={navigateToMain} />
      </NavLink>
    </div>
  );
}
