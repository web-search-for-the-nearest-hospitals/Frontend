import './CheckBox.scss';

interface ICheckBox {
  state: boolean;
  setState: (nevVal: boolean) => void;
}

export default function CheckBox({ state, setState }: ICheckBox) {
  function chengeCheckbox() {
    setState(!state);
  }

  return (
    <label className="checkbox">
      <input className="checkbox__input" type="checkbox" checked={state} onChange={chengeCheckbox} />
      <div className="checkbox__container" />
    </label>
  );
}
