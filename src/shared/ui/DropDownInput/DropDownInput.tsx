import styles from './DropDownInput.module.scss';
import { ChangeEvent } from 'react';

interface IDropDownInput {
  values: readonly string[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  className?: string;
}

export default function DropDownInput({ values, value, onChange, id, className }: IDropDownInput) {
  return (
    <select value={value} onChange={onChange} className={`${styles['drop-down-input']} ${className || ''}`} id={id}>
      {values.map((el, i) => (
        <option key={`${i}_${el}`} className={styles['drop-down-input__option']}>
          {el}
        </option>
      ))}
    </select>
  );
}
