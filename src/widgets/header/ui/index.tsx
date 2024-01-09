import './index.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '~/shared/ui';
import { LocationIcon } from '~/shared/assets';

function Header() {
  const [town] = useState('Калуга');
  return (
    <>
      <Layout>
        <header className="header">
          <p className="header__logo">поиск клиник</p>
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
