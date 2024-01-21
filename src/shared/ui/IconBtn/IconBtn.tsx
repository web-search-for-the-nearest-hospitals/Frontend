import { ReactNode } from 'react';
import styles from './IconBtn.module.scss';
import cn from 'classnames';

interface IconBtn {
  children: ReactNode;
  //children: () => JSX.Element;
  onClick: () => void;
  type?: 'normal' | 'small';
  title?: string;
}

export default function IconBtn({ children, onClick, type = 'normal', title = 'Кнопка' }: IconBtn) {
  return (
    <button className={cn(styles['icon-btn'], styles[`icon-btn_${type}`])} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

/* export default function IconBtn({ Icon, onClick, type = 'normal', title = 'Кнопка' }: IconBtn) {
  return (
    <button className={styles[`icon-btn icon-btn_${type}`]} onClick={onClick} title={title}>
      <Icon />
    </button>
  );
} */
