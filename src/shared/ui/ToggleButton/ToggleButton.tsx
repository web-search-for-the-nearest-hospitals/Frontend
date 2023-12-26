import styles from './ToggleButton.module.scss';

interface IToggleButton {
  state: boolean;
  setState: (nevVal: boolean) => void;
}

export default function ToggleButton({ state, setState }: IToggleButton) {
  function changeToggleButton() {
    setState(!state);
  }

  return (
    <label className={styles['toggle-button']}>
      <input className={styles['toggle-button__input']} type="checkbox" checked={state} onChange={changeToggleButton} />
      <div className={styles['toggle-button__container']} />
    </label>
  );
}
