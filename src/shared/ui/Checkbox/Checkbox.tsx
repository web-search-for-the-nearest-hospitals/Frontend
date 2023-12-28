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

  return (
    <label className={styles['checkbox']}>
      <input className={styles['checkbox__input']} type="checkbox" checked={state} onChange={changeCheckbox} />
      {title}
    </label>
  );
}
