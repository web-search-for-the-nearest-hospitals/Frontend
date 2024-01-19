import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import { ReactNode, useEffect } from 'react';

const cx = classNames.bind(styles);

interface IPopup {
  children: ReactNode;
  isOpen: boolean;
  closePopup: () => void;
}

export default function Popup({ children, isOpen, closePopup }: IPopup) {
  useEffect(() => {
    const closeByESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByESC);
    }
    return () => {
      document.removeEventListener('keydown', closeByESC);
    };
  }, [closePopup, isOpen]);

  return (
    <div
      className={cx('popup', isOpen ? 'popup_opened' : '')}
      onClick={(e) => e.currentTarget === e.target && closePopup()}
    >
      {children}
    </div>
  );
}
