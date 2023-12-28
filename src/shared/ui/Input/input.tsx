import styles from './Input.module.scss';
import { ChangeEvent } from 'react';
import { FieldError } from 'react-hook-form';

interface IInputprops {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type: string;
  className?: string;
  error?: FieldError | undefined;
  placeholder?: string;
}

export default function Input({ value, onChange, id, type, className, error, placeholder }: IInputprops) {
  return (
    <input
      id={id}
      className={`${styles['input']} ${className || ''} ${error ? styles['error'] : ''}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
