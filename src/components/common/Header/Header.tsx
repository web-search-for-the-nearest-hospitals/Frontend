import './Header.scss';

import logo from '../../../assets/icons/logo.svg';
import user from '../../../assets/icons/user.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <img className="header__user" src={user} alt="Иконка пользователя" />
    </header>
  );
}

export default Header;
