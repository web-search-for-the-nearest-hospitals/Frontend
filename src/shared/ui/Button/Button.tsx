import cn from 'classnames';

import styles from './Button.module.scss';

interface IButton {
  onClick?: () => void;
  title?: string;
  type?: 'submit' | 'button';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
}

export default function Button({ title = 'Кнопка', type = 'submit', size = 's', disabled = false, onClick }: IButton) {
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
