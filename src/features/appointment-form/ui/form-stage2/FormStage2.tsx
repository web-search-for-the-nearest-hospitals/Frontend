import React from 'react';
import { MouseEventHandler } from 'react';
import { Button, InputForm, Checkbox } from '~/shared/ui';

interface IFormStage2 {
  handleCheckboxConsent: MouseEventHandler;
  formSubmit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  stateCheckbox: boolean;
  setStateCheckbox: (value: boolean) => void;
  buttonSubmit: boolean;
}

function FormStage2({ handleCheckboxConsent, stateCheckbox, setStateCheckbox, buttonSubmit, formSubmit }: IFormStage2) {
  const regex = {
    name: '^[А-Яа-яёa-zA-Z \\-]+$',
    email: '^\\S+@\\S+\\.\\S+$',
    // tel: '/^+?[(]?[0-9]{3}[)]?[ ]?[0-9]{3}[ ]?[0-9]{2}[ ]?[0-9]{2}$/v',
  };
  return (
    <section className="form-appointment__ch2">
      <InputForm
        type={'text'}
        name={'surname'}
        title={'Фамилия'}
        placeholder={'Иванов'}
        minLength={2}
        maxLength={27}
        pattern={regex.name}
      />
      <InputForm
        type={'text'}
        name={'name'}
        title={'Имя'}
        placeholder={'Иван'}
        minLength={2}
        maxLength={27}
        pattern={regex.name}
      />

      <InputForm
        type={'text'}
        name={'fatherName'}
        title={'Отчество'}
        placeholder={'Иванович'}
        minLength={2}
        maxLength={27}
        pattern={regex.name}
      />
      <InputForm
        type={'tel'}
        name={'tel'}
        title={'Номер телефона'}
        placeholder={'+7 (900) 000 00 00'}
        // minLength={5}
        // maxLength={16}
        // pattern={regex.tel}
      />

      <label className="form-appointment__consent" onClick={handleCheckboxConsent}>
        <Checkbox state={stateCheckbox} setState={setStateCheckbox} title={''} />
        <p className="form-appointment__consent-text">
          Я соглашаюсь с условиями использования сайта и даю согласие на обработку своих персональных данных в
          соответствии сполитикой обработки персональных данных.
        </p>
      </label>
      <div className="form-appointment__button-container">
        <Button
          title="Записаться"
          size="forForm"
          disabled={buttonSubmit}
          onClick={(evt: React.ChangeEvent<HTMLInputElement>) => formSubmit(evt)}
        />
      </div>
    </section>
  );
}

export default FormStage2;
