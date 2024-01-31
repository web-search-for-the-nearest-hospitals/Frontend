import { useState } from 'react';
import styles from './UserIconBtn.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { IconBtn } from '~/shared/ui/index';
import { UserIcon } from '~/shared/assets';

interface IUserIconBtn {
  type?: 'normal' | 'mobile';
  width: number;
  height: number;
}

export default function UserIconBtn({ type = 'normal', width = 33, height = 35 }: IUserIconBtn) {
  const [isUserIconClicked, setIsUserIconClicked] = useState(false);
  return (
    <>
      <div className={cn(styles['icon__icon-button'], styles[`icon__icon-button_type_${type}`])}>
        <IconBtn
          onClick={function (): void {
            setIsUserIconClicked(!isUserIconClicked);
          }}
        >
          <UserIcon width={width} height={height} />
        </IconBtn>
      </div>
      {isUserIconClicked ? (
        <div className={cn(styles['icon__user-click'], styles[`icon__user-click_type_${type}`])}>
          <NavLink className={cn(styles['icon__user-click-link'])} to="/clinic-searcher/main">
            Войти
          </NavLink>
          <NavLink className={cn(styles['icon__user-click-link'])} to="/clinic-searcher/main">
            Регистрация
          </NavLink>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
