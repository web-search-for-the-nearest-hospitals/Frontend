import './index.scss';

import { NavLink, Outlet } from 'react-router-dom';

/* import logo from '~/shared/assets/icons/logo.svg';
import user from '~/shared/assets/icons/user.svg'; */
import logoClinic from '../../../shared/assets/icons/header-logo_clinic.svg';
import logoLoupe from '../../../shared/assets/icons/header-logo_loup.svg';
import userIcon from '../../../shared/assets/icons/header-logo_user.svg';

interface IHeaderProps {
  logo?: string;
  variant?: string;
}
const Header = ({ logo = 'logoClinic', variant = 'primary' }: IHeaderProps) => {
  return (
    <>
      <header className={'header storybook__header_' + variant}>
        {/* @TODO: нужно заменить img на кнопки или обернуть в ссылку, т.к. это функциональные элементы */}
        <img
          className="header__logo"
          src={logo == 'logoLoupe' ? logoLoupe : logo == 'logoClinic' ? logoClinic : logoClinic}
          alt="Логотип"
        />
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
        <img className="header__user" src={userIcon} alt="Иконка пользователя" />
      </header>
      <Outlet />
    </>
  );
};

export default Header;
