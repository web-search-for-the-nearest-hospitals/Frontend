import styles from './CloseButton.module.scss';

interface ICloseButton {
  onClick?: () => void;
  type: 'button';
}

export default function CloseButton({ type = 'button', onClick }: ICloseButton) {
  return <button type={type} className={styles['close-button']} onClick={onClick}></button>;
}
