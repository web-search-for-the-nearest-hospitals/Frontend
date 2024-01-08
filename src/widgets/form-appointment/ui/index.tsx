import { DropDownInput, Input } from '~/shared/ui';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Button from '~/shared/ui/Button/Button';
import { setFormData } from '~/entities/appointment/model/appointmentSlice';
import { useState } from 'react';

interface IFormData {
  name: string;
  phoneNumber: string;
  email: string;
  doctorSpecialty: string;
  appointmentDate: string;
}

export default function FormAppointment() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    mode: 'onBlur',
    defaultValues: {
      doctorSpecialty: '',
    },
  });

  const doctors = ['терапевт', 'хирург', 'стоматолог'];
  const [doctorSpecialty, setDoctorSpecialty] = useState(doctors[0]!);

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(setFormData(data));
    console.log(data);
  };

  const handleDoctorChange = (value: string) => {
    setDoctorSpecialty(value);
  };

  const handleSelectChange = (value: string) => {
    handleDoctorChange(value);
    setValue('doctorSpecialty', value);
  };

  return (
    <form className={styles['form-appointment']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['form-appointment__wrapper']}>
        <label htmlFor="doctorSpecialty" className={styles['form-appointment__label']}>
          Специальность
        </label>
        <Controller
          name="doctorSpecialty"
          control={control}
          render={({ field }) => (
            <DropDownInput
              state={doctorSpecialty}
              {...field}
              ref={null}
              values={doctors}
              setState={handleSelectChange}
            />
          )}
        />
      </div>

      <div
        className={`${styles['form-appointment__wrapper']} ${
          errors.appointmentDate ? styles['form-appointment__wrapper_error'] : ''
        }`}
      >
        <label htmlFor="appointmentDate" className={styles['form-appointment__label']}>
          Дата записи
        </label>
        <Controller
          name="appointmentDate"
          control={control}
          rules={{ required: 'Обязательное поле' }}
          render={({ field }) => (
            <Input
              {...field}
              ref={null}
              id="appointmentDate"
              className={`${errors.appointmentDate ? styles['form-appointment__input-date'] : ''}`}
              type="date"
              error={errors.appointmentDate}
            />
          )}
        />
        {errors.appointmentDate && (
          <p className={styles['form-appointment__error']}>{errors.appointmentDate.message}</p>
        )}
      </div>

      <div
        className={`${styles['form-appointment__wrapper']} ${
          errors.name ? styles['form-appointment__wrapper_error'] : ''
        }`}
      >
        <label htmlFor="name" className={styles['form-appointment__label']}>
          ФИО
        </label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Обязательное поле',
            minLength: {
              value: 5,
              message: 'Введите не менее 5 символов',
            },
          }}
          render={({ field }) => (
            <Input {...field} id="name" type="text" error={errors.name} ref={null} placeholder="Иванов Иван Иванович" />
          )}
        />
        {errors.name && <p className={styles['form-appointment__error']}>{errors.name.message}</p>}
      </div>

      <div
        className={`${styles['form-appointment__wrapper']} ${
          errors.phoneNumber ? styles['form-appointment__wrapper_error'] : ''
        }`}
      >
        <label htmlFor="phoneNumber" className={styles['form-appointment__label']}>
          Номер телефона
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
              message: 'Введите корректный номер телефона',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              ref={null}
              id="phoneNumber"
              type="tel"
              error={errors.phoneNumber}
              placeholder="+7 (900) 000 00 00"
            />
          )}
        />
        {errors.phoneNumber && <p className={styles['form-appointment__error']}>{errors.phoneNumber.message}</p>}
      </div>

      <div
        className={`${styles['form-appointment__wrapper']} ${
          errors.email ? styles['form-appointment__wrapper_error'] : ''
        }`}
      >
        <label htmlFor="email" className={styles['form-appointment__label']}>
          Почта
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: /^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Введите корректный адрес электронной почты',
            },
          }}
          render={({ field }) => (
            <Input {...field} ref={null} id="email" type="email" error={errors.email} placeholder="poisk.kl@mail.ru" />
          )}
        />
        {errors.email && <p className={styles['form-appointment__error']}>{errors.email.message}</p>}
      </div>
      <Button size="l" title="Записаться" type={'submit'} disabled={!isValid} />
    </form>
  );
}
