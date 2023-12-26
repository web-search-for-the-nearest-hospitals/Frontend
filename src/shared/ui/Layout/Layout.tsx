import styles from './Layout.module.scss';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return <main className={styles['main']}>{children}</main>;
}
