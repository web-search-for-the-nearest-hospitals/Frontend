import styles from './Popup.module.scss';
import cn from 'classnames';
import { ReactNode } from 'react';

interface IPopup {
  children: ReactNode;
  isOpen: boolean;
}

export default function Popup({ children, isOpen }: IPopup) {
  return <div className={cn(styles['popup'], isOpen ? styles['popup_opened'] : false)}>{children}</div>;
}
