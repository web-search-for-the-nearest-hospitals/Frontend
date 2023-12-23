import './index.scss';
import { NavLink, Outlet } from 'react-router-dom';

import logo from '~/shared/assets/icons/logo.svg';
import user from '~/shared/assets/icons/user.svg';
import { Layout } from '~/shared/ui';

function Header() {
  return (
    <>
      <header className="header">
        {/* @TODO: нужно заменить img на кнопки или обернуть в ссылку, т.к. это функциональные элементы */}
        <img className="header__logo" src={logo} alt="Логотип" />
        <nav className="header__link-list">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
            }
            to={'/clinic-searcher/main'}
          >
            Главная
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
            }
            to={'/clinic-searcher/redux'}
          >
            Redux
          </NavLink>
        </nav>
        <img className="header__user" src={user} alt="Иконка пользователя" />
      </header>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default Header;
