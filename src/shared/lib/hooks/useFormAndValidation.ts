import { useState, useCallback } from 'react';

export function useFormAndValidation(inputValues: any) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (
      (e.target.validationMessage === 'Введите данные в указанном формате.' && e.target.name === 'name') ||
      (e.target.validationMessage === 'Введите данные в указанном формате.' && e.target.name === 'surname') ||
      (e.target.validationMessage === 'Введите данные в указанном формате.' && e.target.name === 'fatherName')
    ) {
      setTimeout(() => {
        setErrors({
          ...errors,
          [name]: 'Поле должно содержать только латиницу или кириллицу',
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setErrors({ ...errors, [name]: e.target.validationMessage });
      }, 1000);
    }

    setIsValid(e.target.closest('form').checkValidity());

    const btn = e.target.closest('form').querySelector("[name='buttonForm']");

    if (e.target.closest('form').checkValidity()) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

// запуск валидации
//  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation()
