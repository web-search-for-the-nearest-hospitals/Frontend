import './Layout.scss';
import { ReactNode } from 'react';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return <main className="main">{children}</main>;
}
