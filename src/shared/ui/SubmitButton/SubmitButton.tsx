import styles from './SubmitButton.module.scss';

interface ISubmitButton {
  value: string;
  //handleSubmit: (nevVal: string) => void;
  title: string;
}

export default function SearchButton({ title, value }: ISubmitButton) {
  function onSubmit() {
    localStorage.setItem('doc', value);
  }

  return (
    <button className={styles['submit-button']} type="submit" onClick={onSubmit}>
      {title}
    </button>
  );
}
