import './index.scss';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';

function Header() {
  const [town] = useState('Калуга');
  return (
    <>
      <Layout>
        <header className="header">
          <NavLink to="/">
            <p className="header__logo">поиск клиник</p>
          </NavLink>
          <NavLink to="/clinic-searcher/sign-up">
            <p>Регистрация</p>
          </NavLink>
          <div className="header__location">
            <LocationIcon size={20} />
            <p className="header__location-text">{town}</p>
          </div>
        </header>
        <Outlet />
      </Layout>
    </>
  );
}

export default Header;
