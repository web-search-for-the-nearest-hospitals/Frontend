import styles from './Preloader.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Preloader() {
  return (
    <div className={cx('preloader')}>
      <div className={cx('preloader__container')}>
        <span className={cx('preloader__round')}></span>
        <span className={cx('preloader__round')}></span>
        <span className={cx('preloader__round')}></span>
      </div>
    </div>
  );
}
