import './index.scss';
import { Popup, Button, CloseButton } from '~/shared/ui/index';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* interface ITooltip {
  isOpenPopup: boolean;
} */

export function Tooltip() {
  const [isClose, setIsClose] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(true);
  const navigate = useNavigate();

  function navigateToMain() {
    setIsOpenPopup(false);
    navigate('/');
  }
  return (
    <Popup isOpen={isOpenPopup} isClose={isClose}>
      <div className="tooltip">
        <CloseButton type="button" onClick={() => setIsClose(true)} />
        <p className="tooltip__text">
          Ваша запись на рассмотрении. Администратор свяжется с вами для уточнения записи.
        </p>
        <Button title="На главную" size="m" type="submit" onClick={navigateToMain} />
      </div>
    </Popup>
  );
}
