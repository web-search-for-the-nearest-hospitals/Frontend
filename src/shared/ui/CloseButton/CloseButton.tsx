import styles from './CloseButton.module.scss';

interface ICloseButton {
  type: 'button';
}

export default function CloseButton({ type = 'button' }: ICloseButton) {
  return <button type={type} className={styles['close-button']}></button>;
}
