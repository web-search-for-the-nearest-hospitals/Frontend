import styles from './Checkbox.module.scss';

interface ICheckbox {
  state: boolean;
  setState: (nevVal: boolean) => void;
  title: string;
}

export default function Checkbox({ state, setState, title }: ICheckbox) {
  function changeCheckbox() {
    setState(!state);
  }

  function onKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      changeCheckbox();
    }
  }

  return (
    <label className={styles['checkbox']}>
      <div className={styles['checkbox__container']}>
        <input className={styles['checkbox__input']} type="checkbox" checked={state} onChange={changeCheckbox} />
        <div className={styles['checkbox__visible']} onKeyDown={onKey} tabIndex={0} />
      </div>
      <label className={styles['checkbox__title']} onClick={changeCheckbox}>
        {title}
      </label>
    </label>
  );
}
