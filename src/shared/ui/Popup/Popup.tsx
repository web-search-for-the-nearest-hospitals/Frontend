import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);

interface IPopup {
  children: ReactNode;
  isOpen: boolean;
  isClose: boolean;
}
// @TODO написать условие на закрытие попапа, либо обработать иначе
export default function Popup({ children, isOpen }: IPopup) {
  return <div className={cx('popup', isOpen ? 'popup_opened' : '')}>{children}</div>;
}
