import { useMemo } from 'react';
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
  handleChange: (e: any) => void;
  value: string;
  error: string;
}

export default function InputForm({
  type,
  name,
  title,
  placeholder,
  minLength,
  maxLength,
  pattern,
  handleChange,
  value,
  error,
}: IImputForm) {
  useMemo(() => {
    value;
  }, [value]);

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
        value={value || ''}
        onChange={(e) => handleChange(e)}
        required
        id={name}
        pattern={pattern}
      />
      <span className={styles['input-form__span-error']}>{error}</span>
    </label>
  );
}
