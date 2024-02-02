import React, { useState } from 'react';
import { MouseEventHandler } from 'react';
import { Button, InputForm, Checkbox } from '~/shared/ui';

interface IFormStage2 {
  formSubmit: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormStage2({ formSubmit }: IFormStage2) {
  const [stateCheckbox, setStateCheckbox] = useState(false);
  const [isDisabledButtonSubmit, setIsDisabledButtonSubmit] = useState(true);
  const [regex] = useState({
    name: '^[А-Яа-яёa-zA-Z \\-]+$',
    tel: '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$',
  }); // https://habr.com/ru/articles/110731/

  const handleChangeForm: MouseEventHandler = (e) => {
    const form = e.currentTarget.closest('form');
    if (form?.checkValidity() && stateCheckbox) {
      setIsDisabledButtonSubmit(false);
    } else setIsDisabledButtonSubmit(true);
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
        placeholder={'8 (900) 000 00 00'}
        pattern={regex.tel}
      />

      <label className="form-appointment__consent" onClick={handleChangeForm}>
        <Checkbox state={stateCheckbox} setState={setStateCheckbox} sx={{ gap: '20px' }}>
          <p className="form-appointment__consent-text">
            Я соглашаюсь с условиями использования сайта и даю согласие на обработку своих персональных данных в
            соответствии сполитикой обработки персональных данных.
          </p>
        </Checkbox>
      </label>
      <div className="form-appointment__button-container">
        <Button
          title="Записаться"
          size="forForm"
          disabled={isDisabledButtonSubmit}
          onClick={(evt: React.ChangeEvent<HTMLInputElement>) => formSubmit(evt)}
        />
      </div>
    </section>
  );
}

export default FormStage2;
