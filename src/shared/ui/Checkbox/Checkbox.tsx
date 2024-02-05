import React from 'react';
import styles from './Checkbox.module.scss';

interface ICheckbox {
  state: boolean;
  setState: (nevVal: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  required?: boolean;
  sx?: {
    gap?: string;
  };
}

export default function Checkbox({ state, setState, title, children, sx, required = false }: ICheckbox) {
  function changeCheckbox() {
    setState(!state);
  }

  function onKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      changeCheckbox();
    }
  }

  return (
    <label className={styles['checkbox']} style={sx}>
      <div className={styles['checkbox__container']}>
        <input
          className={styles['checkbox__input']}
          type="checkbox"
          checked={state}
          onChange={changeCheckbox}
          required={required}
        />
        <div className={styles['checkbox__visible']} onKeyDown={onKey} tabIndex={0} />
      </div>
      <label className={styles['checkbox__title']} onClick={changeCheckbox}>
        {title}
        {children}
      </label>
    </label>
  );
}
