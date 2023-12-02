import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Я просто сайт</h1>
      <nav className="header__link-list">
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
          }
          to={'/main'}
        >
          Главная
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'header__link header__link_active' : 'header__link'
          }
          to={'/map'}
        >
          Карта
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
