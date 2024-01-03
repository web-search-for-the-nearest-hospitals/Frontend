import styles from './DropDownMenu.module.scss';

interface IDropDownMenu {
  values: readonly string[];
  placeholder: string;
  setState: (newVal: string) => void;
}

export default function DropDownMenu({ values, placeholder, setState }: IDropDownMenu) {
  // @TODO: вынести логику в виджет или функцию
  /* const [query, setQuery] = useState('');
  function onChange(evt: any) {
    const val = evt.target.value;
    setQuery(val);
  } */
  return (
    <>
      <input
        list="doc"
        className={styles['drop-down-menu']}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
      <datalist id="doc" className={styles['drop-down-menu__option-container']}>
        {values.map((el, i) => (
          <option key={`${i}_${el}`} className={styles['drop-down-menu__option']}>
            {el}
          </option>
        ))}
      </datalist>
    </>
  );
}
