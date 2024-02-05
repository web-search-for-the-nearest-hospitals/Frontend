import styles from './Layout.module.scss';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
  type?: 'card' | 'main';
}

export default function Layout({ children, type = 'main' }: ILayout) {
  if (type === 'card') return <section className={styles['card']}>{children}</section>;
  return <main className={styles['main']}>{children}</main>;
}
