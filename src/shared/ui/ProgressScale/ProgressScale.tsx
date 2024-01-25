import styles from './ProgressScale.module.scss';
import cn from 'classnames';

interface IProgressScale {
  active: number;
}

function ProgressScale({ active }: IProgressScale) {
  console.log(styles);

  return (
    <div className={styles['progress-scale']}>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            active > 0 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          1
        </div>
        <div
          className={cn(
            styles['progress-scale__element-line'],
            active > 0 ? styles['progress-scale__element-line_active'] : '',
          )}
        ></div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            active > 0 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Информация о клинике
        </p>
      </div>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            active > 1 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          2
        </div>
        <div
          className={cn(
            styles['progress-scale__element-line'],
            active > 1 ? styles['progress-scale__element-line_active'] : '',
          )}
        ></div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            active > 1 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Информация о специалистах
        </p>
      </div>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            active > 2 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          3
        </div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            active > 2 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Авторизация
        </p>
      </div>
    </div>
  );
}

export default ProgressScale;
