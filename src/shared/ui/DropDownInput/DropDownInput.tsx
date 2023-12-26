import styles from './DropDownInput.module.scss';

interface IDropDownInput {
  values: readonly string[];
  state: string;
  setState: (newVal: string) => void;
}

export default function DropDownInput({ values, state, setState }: IDropDownInput) {
  return (
    <select value={state} onChange={(e) => setState(e.target.value)} className={styles['drop-down-input']}>
      {values.map((el, i) => (
        <option key={`${i}_${el}`} className={styles['drop-down-input__option']}>
          {el}
        </option>
      ))}
    </select>
  );
}
