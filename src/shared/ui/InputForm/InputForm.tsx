import styles from './InputForm.module.scss';
import { useState } from 'react';
import cn from 'classnames';

interface IImputForm {
  type: string;
  name: string;
  title: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export default function InputForm({ type, name, title, placeholder, minLength, maxLength, pattern }: IImputForm) {
  const [valueInput, setValueInput] = useState('');
  const [error, setError] = useState('');

  function handleChangeInput(e: any) {
    setError(e.target.validationMessage ? e.target.validationMessage : '');
    setValueInput(e.target.value);
  }
  return (
    <label className={styles['input-form']}>
      <p className={styles['input-form__title']}>{title}</p>
      <input
        className={cn(styles['input-form__input'], error ? styles['input-form__input_error'] : '')}
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={valueInput || ''}
        onChange={(e) => handleChangeInput(e)}
        required
        id={name}
        pattern={pattern}
      />
      <span className={styles['input-form__span-error']}>{error}</span>
    </label>
  );
}
