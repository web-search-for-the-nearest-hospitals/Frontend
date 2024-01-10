import styles from './Input.module.scss';
import { ChangeEvent, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

interface IInputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type: string;
  className?: string;
  error?: FieldError | undefined;
  placeholder?: string;
  ref?: LegacyRef<HTMLInputElement> | undefined | null;
}

export default function Input({ value, onChange, id, type, className, error, placeholder, onBlur, ref }: IInputProps) {
  return (
    <input
      id={id}
      className={`${styles['input']} ${className || ''} ${error ? styles['error'] : ''}`}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      ref={ref}
    />
  );
}
