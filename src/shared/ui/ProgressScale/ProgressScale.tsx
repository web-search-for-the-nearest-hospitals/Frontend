import styles from './ProgressScale.module.scss';
import cn from 'classnames';

interface IProgressScale {
  activeStage: number;
}

function ProgressScale({ activeStage }: IProgressScale) {
  return (
    <div className={styles['progress-scale']}>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            activeStage > 0 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          1
        </div>
        <div
          className={cn(
            styles['progress-scale__element-line'],
            activeStage > 0 ? styles['progress-scale__element-line_active'] : '',
          )}
        ></div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            activeStage > 0 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Информация о клинике
        </p>
      </div>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            activeStage > 1 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          2
        </div>
        <div
          className={cn(
            styles['progress-scale__element-line'],
            activeStage > 1 ? styles['progress-scale__element-line_active'] : '',
          )}
        ></div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            activeStage > 1 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Информация о специалистах
        </p>
      </div>
      <div className={styles['progress-scale__element']}>
        <div
          className={cn(
            styles['progress-scale__element-circle'],
            activeStage > 2 ? styles['progress-scale__element-circle_active'] : '',
          )}
        >
          3
        </div>
        <p
          className={cn(
            styles['progress-scale__text-circle'],
            activeStage > 2 ? styles['progress-scale__element-text_active'] : '',
          )}
        >
          Авторизация
        </p>
      </div>
    </div>
  );
}

export default ProgressScale;
