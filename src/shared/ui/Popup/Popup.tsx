import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { ReactNode, useEffect } from 'react';

const cx = classNames.bind(styles);

interface IPopup {
  children: ReactNode;
  isOpen: boolean;
  isClose: () => void;
}

export default function Popup({ children, isOpen, isClose }: IPopup) {
  useEffect(() => {
    const closeByESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        isClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByESC);
    }
    return () => {
      document.removeEventListener('keydown', closeByESC);
    };
  }, [isClose, isOpen]);

  return (
    <div
      className={cx('popup', isOpen ? 'popup_opened' : '')}
      onClick={(e) => e.currentTarget === e.target && isClose()}
    >
      {children}
    </div>
  );
}
