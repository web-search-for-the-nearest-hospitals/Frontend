import styles from './ToggleButton.module.scss';

interface IToggleButton {
  state: boolean;
  setState: (nevVal: boolean) => void;
}

export default function ToggleButton({ state, setState }: IToggleButton) {
  function changeToggleButton() {
    setState(!state);
  }

  function onKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      changeToggleButton();
    }
  }

  return (
    <label className={styles['toggle-button']} role="switch" aria-label={state ? 'Выключено' : 'Включено'}>
      <input className={styles['toggle-button__input']} type="checkbox" checked={state} onChange={changeToggleButton} />
      <div className={styles['toggle-button__container']} onKeyDown={onKey} tabIndex={0} />
    </label>
  );
}
