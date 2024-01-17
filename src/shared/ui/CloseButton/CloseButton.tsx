import cn from 'classnames';
import styles from './CloseButton.module.scss';

interface ICloseButton {
  onClick?: () => void;
  type: 'button';
  size: 's' | 'm';
}

export default function CloseButton({ type = 'button', size = 'm', onClick }: ICloseButton) {
  return (
    <button
      type={type}
      className={cn(styles['close-button'], styles[`close-button_size_${size}`])}
      onClick={onClick}
    ></button>
  );
}
