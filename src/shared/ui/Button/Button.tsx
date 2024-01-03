import cn from 'classnames';

import styles from './Button.module.scss';

interface IButton {
  onClick?: () => void;
  title: string;
  value?: string;
  type: 'submit' | 'button';
  size: 's' | 'l';
  disabled?: boolean;
}

export default function Button({ title, type = 'submit', size = 's', disabled, onClick }: IButton) {
  return (
    <button
      type={type}
      className={cn(styles['submit-button'], styles[`submit-button_size_${size}`])}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
