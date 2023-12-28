import { DropDownInput } from '~/shared/ui';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Input from '~/shared/ui/Input/input';
import Button from '~/shared/ui/Button/Button';
import { setFormData } from '~/entities/appointment/model/appointmentSlice';

interface FormData {
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
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      doctorSpecialty: 'терапевт',
    },
  });

  const doctors = ['терапевт', 'хирург', 'стоматолог'];

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
              {...field}
              values={doctors}
              id="doctorSpecialty"
              className={styles['form-appointment__select']}
              onChange={(e) => {
                dispatch(setFormData({ doctorSpecialty: e.target.value }));
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.doctorSpecialty && (
          <p className={styles['form-appointment__error']}>{errors.doctorSpecialty.message}</p>
        )}
      </div>

      <div className={styles['form-appointment__wrapper']}>
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
              id="appointmentDate"
              className={`${errors.appointmentDate ? styles['form-appointment__input-date'] : ''}`}
              type="date"
              error={errors.appointmentDate}
              onChange={(e) => {
                dispatch(setFormData({ appointmentDate: e.target.value }));
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.appointmentDate && (
          <p className={styles['form-appointment__error']}>{errors.appointmentDate.message}</p>
        )}
      </div>

      <div className={styles['form-appointment__wrapper']}>
        <label htmlFor="name" className={styles['form-appointment__label']}>
          ФИО
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Обязательное поле' }}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              type="text"
              error={errors.name}
              placeholder="Иванов Иван Иванович"
              onChange={(e) => {
                dispatch(setFormData({ name: e.target.value }));
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.name && <p className={styles['form-appointment__error']}>{errors.name.message}</p>}
      </div>

      <div className={styles['form-appointment__wrapper']}>
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
              id="phoneNumber"
              type="tel"
              error={errors.phoneNumber}
              placeholder="+7 (900) 000 00 00"
              onChange={(e) => {
                dispatch(setFormData({ phoneNumber: e.target.value }));
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.phoneNumber && <p className={styles['form-appointment__error']}>{errors.phoneNumber.message}</p>}
      </div>

      <div className={styles['form-appointment__wrapper']}>
        <label htmlFor="email" className={styles['form-appointment__label']}>
          Почта
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Введите корректный адрес электронной почты',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              type="email"
              error={errors.email}
              placeholder="poisk.kl@mail.ru"
              onChange={(e) => {
                dispatch(setFormData({ email: e.target.value }));
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.email && <p className={styles['form-appointment__error']}>{errors.email.message}</p>}
      </div>
      <Button size="l" title="Записаться" value={''} type={'submit'} />
    </form>
  );
}
