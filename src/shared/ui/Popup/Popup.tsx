import styles from './Popup.module.scss';
import cn from 'classnames';
import { ReactNode } from 'react';

interface IPopup {
  children: ReactNode;
  opened?: 'opened';
}

export default function Popup({ children, opened = 'opened' }: IPopup) {
  return <div className={cn(styles['popup'], styles[`popup_${opened}`])}>{children}</div>;
}
