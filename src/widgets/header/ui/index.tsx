import './index.scss';
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Layout } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';

function Header() {
  const [town] = useState('Калуга');
  return (
    <>
      <header className="header">
        <NavLink to="/clinic-searcher/main">
          <p className="header__logo">поиск клиник</p>
        </NavLink>
        <div className="header__location">
          <LocationIcon size={20} />
          <p className="header__location-text">{town}</p>
        </div>
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default Header;
