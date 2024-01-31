import { useState } from 'react';
import styles from './InputForm.module.scss';
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
  const [valueInput, setValueInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  function handleChangeInput(e: any) {
    e.target.validationMessage
      ? setTimeout(() => {
          setError(e.target.validationMessage);
        }, 1500)
      : setError('');

    setValueInput(e.target.value);
  }
  return (
    <label className={styles['inputform']}>
      <p className={styles['inputform__title']}>{title}</p>
      <input
        className={cn(styles['inputform__input'], error ? styles['inputform__input_error'] : '')}
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
      <span className={styles['inputform__span-error']}>{error}</span>
    </label>
  );
}
