import styles from './SearchInput.module.scss';

interface ISearchInput {
  values: readonly string[];
  state: string;
  setState: (newVal: string) => void;
}

export default function SearchInput({ values, state, setState }: ISearchInput) {
  /* const [query, setQuery] = useState('');
  function onChange(evt: any) {
    const val = evt.target.value;
    setQuery(val);
  } */
  return (
    <>
      <input list="doc" className={styles['search-input']} value={state} onChange={(e) => setState(e.target.value)} />
      <datalist id="doc" className={styles['search-input__option-container']}>
        {values.map((el, i) => (
          <option key={`${i}_${el}`} className={styles['search-input__option']}>
            {el}
          </option>
        ))}
      </datalist>
    </>
  );
}
