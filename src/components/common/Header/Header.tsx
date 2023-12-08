import { NavLink } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import user from '../../../assets/icons/user.svg';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {/* <h1 className="header__title">Я просто сайт</h1> */}
      <nav className="header__link-list">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
          }
          to={'/clinic-searcher/'}
        >
          Главная
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
          }
          to={'/clinic-searcher/map'}
        >
          Карта
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
          }
          to={'/clinic-searcher/main'}
        >
          Redux
        </NavLink>
      </nav>
      <img className="header__user" src={user} alt="Иконка пользователя" />
    </header>
  );
}

export default Header;
