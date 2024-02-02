import { useState } from 'react';
import { Button, InputForm, Checkbox } from '~/shared/ui';
import { useFormAndValidation } from '~/shared/lib/hooks/useFormAndValidation';

interface IFormStage2 {
  setFio: (values: string) => void;
  setPhone: (values: string) => void;
}

export default function FormStage2({ setFio, setPhone }: IFormStage2) {
  const [stateCheckbox, setStateCheckbox] = useState(false);

  const [regex] = useState({
    name: '^[А-Яа-яёa-zA-Z]+$',
    tel: '^(8|\\+7)[\\- ]?[\\(]?\\d{3}[\\)]?[\\- ]?\\d{3}[\\- ]?\\d{2}[\\- ]?\\d{2}$', //идеалка, а не регулярка
  });

  const { values, handleChange, errors } = useFormAndValidation({
    surname: '',
    name: '',
    fatherName: '',
    tel: '',
  });

  const handleClickButton = () => {
    setFio(`${values.surname} ${values.name} ${values.fatherName} `);
    setPhone(values.tel);
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
        value={values.surname}
        error={errors.surname}
        handleChange={handleChange}
      />
      <InputForm
        type={'text'}
        name={'name'}
        title={'Имя'}
        placeholder={'Иван'}
        minLength={2}
        maxLength={27}
        pattern={regex.name}
        value={values.name}
        error={errors.name}
        handleChange={handleChange}
      />
      <InputForm
        type={'text'}
        name={'fatherName'}
        title={'Отчество'}
        placeholder={'Иванович'}
        minLength={2}
        maxLength={27}
        pattern={regex.name}
        value={values.fatherName}
        error={errors.fatherName}
        handleChange={handleChange}
      />
      <InputForm
        type={'tel'}
        name={'tel'}
        title={'Номер телефона'}
        placeholder={'8 (900) 000 00 00'}
        pattern={regex.tel}
        value={values.tel}
        error={errors.tel}
        handleChange={handleChange}
      />

      {/* нужно выводить пользователю ошибку вручную, т.к. чекбокса не существует в вёрстке */}
      <label className="form-appointment__consent">
        <Checkbox
          handleChange={handleChange}
          state={stateCheckbox}
          setState={setStateCheckbox}
          sx={{ gap: '20px' }}
          required
        >
          <p className="form-appointment__consent-text">
            Я соглашаюсь с условиями использования сайта и даю согласие на обработку своих персональных данных в
            соответствии сполитикой обработки персональных данных.
          </p>
        </Checkbox>
      </label>
      <div className="form-appointment__button-container">
        <Button title="Записаться" size="forForm" disabled={true} name={'buttonForm'} onClick={handleClickButton} />
      </div>
    </section>
  );
}
