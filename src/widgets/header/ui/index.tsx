import './index.scss';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { useSpecialtiesSlice } from '~/entities/clinic';

import { Layout } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';
import UserIcon from '~/shared/assets/icons/UserIcon';
import IconBtn from '~/shared/ui/IconBtn/IconBtn';
import createToast from '~/shared/lib/toast/createToast';

function Header() {
  const [town] = useState('Калуга');
  const { isGetSpecialty } = useSpecialtiesSlice();

  const getContent = () => {
    if (!isGetSpecialty) {
      return <p className="search-clinic">Загружаю список специальностей</p>;
    }

    return <Outlet />;
  };

  return (
    <>
      <header className="header">
        <NavLink to="/clinic-searcher/main">
          <p className="header__logo">поиск клиник</p>
        </NavLink>
        <div className="header__container">
          <div className="header__location">
            <LocationIcon size={20} />
            <p className="header__location-text">{town}</p>
          </div>
          <div className="header__icon-button">
            {/* На странице присутствуют две кнопки IconBtn(UserIcon),
           при внесении изменений в эту кнопку - изменить вторую /widgets/searcher-block/ui/index.tsx */}
            <IconBtn
              onClick={function (): void {
                createToast('info', 'I work!');
              }}
            >
              <UserIcon width={18.86} height={20} />
            </IconBtn>
          </div>
        </div>
      </header>
      <Layout>{getContent()}</Layout>
    </>
  );
}

export default Header;
