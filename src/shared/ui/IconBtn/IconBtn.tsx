import './IconBtn.scss';

interface IconBtn {
  Icon: () => JSX.Element;
  onClick: () => void;
  type?: 'normal' | 'small';
  title?: string;
}

export default function IconBtn({ Icon, onClick, type = 'normal', title = 'Кнопка' }: IconBtn) {
  return (
    <button className={`icon-btn icon-btn_${type}`} onClick={onClick} title={title}>
      <Icon />
    </button>
  );
}
