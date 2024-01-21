import './index.scss';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';
import UserIcon from '~/shared/assets/icons/UserIcon';
import IconBtn from '~/shared/ui/IconBtn/IconBtn';

function Header() {
  const [town] = useState('Калуга');
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
            <IconBtn
              onClick={function (): void {
                console.log('IconBtn works!');
              }}
            >
              <UserIcon width={18} height={20} />
            </IconBtn>
          </div>
        </div>
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default Header;
