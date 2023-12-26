import './index.scss';
import { Outlet } from 'react-router-dom';
import { Layout } from '~/shared/ui';

function Header() {
  return (
    <>
      <Layout>
        <header className="header">
          <p className="header__logo">поиск клиник</p>
        </header>
        <Outlet />
      </Layout>
    </>
  );
}

export default Header;
