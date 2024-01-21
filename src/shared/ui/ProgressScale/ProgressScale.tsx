import './ProgressScale.scss';

interface IProgressScale {
  active: string;
}

function ProgressScale({ active }: IProgressScale) {
  return (
    <div className="progress-scale">
      <div className="progress-scale__element ">
        <div
          className={`progress-scale__element-circle ${
            active === '1' || active === '2' || active === '3' ? 'progress-scale__element-circle_active' : ''
          }`}
        >
          1
        </div>
        <div
          className={`progress-scale__element-line ${
            active === '1' || active === '2' || active === '3' ? 'progress-scale__element-line_active' : ''
          }`}
        ></div>
        <p
          className={`progress-scale__element-text ${
            active === '1' || active === '2' || active === '3' ? 'progress-scale__element-text_active' : ''
          }`}
        >
          Информация о клинике
        </p>
      </div>
      <div className="progress-scale__element">
        <div
          className={`progress-scale__element-circle ${
            active === '2' || active === '3' ? 'progress-scale__element-circle_active' : ''
          }`}
        >
          2
        </div>
        <div
          className={`progress-scale__element-line ${
            active === '2' || active === '3' ? 'progress-scale__element-line_active' : ''
          }`}
        ></div>
        <p
          className={`progress-scale__element-text ${
            active === '2' || active === '3' ? 'progress-scale__element-text_active' : ''
          }`}
        >
          Информация о специалистах
        </p>
      </div>
      <div className="progress-scale__element">
        <div
          className={`progress-scale__element-circle ${active === '3' ? 'progress-scale__element-circle_active' : ''}`}
        >
          3
        </div>
        <p className={`progress-scale__element-text ${active === '3' ? 'progress-scale__element-text_active' : ''}`}>
          Авторизация
        </p>
      </div>
    </div>
  );
}

export default ProgressScale;
