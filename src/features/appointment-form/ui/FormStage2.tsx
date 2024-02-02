import { useState } from 'react';
import { Button, InputForm, Checkbox } from '~/shared/ui';

export default function FormStage2() {
  const [stateCheckbox, setStateCheckbox] = useState(false);
  const [regex] = useState({
    name: '^[А-Яа-яёa-zA-Z \\-]+$',
    tel: '^(8|\\+7)[\\- ]?[\\(]?\\d{3}[\\)]?[\\- ]?\\d{3}[\\- ]?\\d{2}[\\- ]?\\d{2}$', //идеалка, а не регулярка
  });
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

      {/* нужно выводить пользователю ошибку вручную, т.к. чекбокса не существует в вёрстке */}
      <label className="form-appointment__consent">
        <Checkbox state={stateCheckbox} setState={setStateCheckbox} sx={{ gap: '20px' }} required>
          <p className="form-appointment__consent-text">
            Я соглашаюсь с условиями использования сайта и даю согласие на обработку своих персональных данных в
            соответствии сполитикой обработки персональных данных.
          </p>
        </Checkbox>
      </label>
      <div className="form-appointment__button-container">
        <Button title="Записаться" size="forForm" />
      </div>
    </section>
  );
}
