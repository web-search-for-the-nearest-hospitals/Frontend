import styles from './Checkbox.module.scss';

interface ICheckbox {
  state: boolean;
  setState: (nevVal: boolean) => void;
  children: string | JSX.Element;
  className?: string;
}

export default function Checkbox({ state, setState, children, className }: ICheckbox) {
  function changeCheckbox() {
    setState(!state);
  }

  return (
    <label className={`${styles['checkbox']} ${className || ''}`}>
      <input className={styles['checkbox__input']} type="checkbox" checked={state} onChange={changeCheckbox} />
      {children}
    </label>
  );
}
