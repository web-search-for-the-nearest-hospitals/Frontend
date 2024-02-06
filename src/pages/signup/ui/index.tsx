import './index.scss';

import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLazyCreateUserQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';
import { Button, InputForm, Layout } from '~/shared/ui';

// @TODO: бэк отсылает разные поля для разных ошибок, password для сообщения о паттерне и non_field_errors если email уже зареган
export default function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [addErrMsg] = useState(
    'Мы пока не сделали более точную подсказку, простите. Но скорее всего дело в слишком простом пароле или же такой пользователь уже существует.',
  );
  const [triggerQuery, queryResult] = useLazyCreateUserQuery();
  const { isError, isSuccess, isLoading, error } = queryResult;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerQuery({ email, password });
  };

  useEffect(() => {
    if (isError) createToast('error', 'Не удалось зарегистрироваться');
    if (isSuccess) {
      createToast('success', 'Успешно!');
      nav('/clinic-searcher/signin');
    }
  }, [isError, isSuccess, nav]);

  // @TODO: нужно разобраться с типизацией
  useEffect(() => {
    if (error && 'data' in error && 'password' in (error.data as { password: string })) {
      setErrorMsg((error.data as { password: string }).password[0] || '');
    } else {
      setErrorMsg('');
    }
  }, [error]);

  return (
    <>
      <Layout type="card">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="signup-form__title">Регистрация</h3>
          <div className="signup-form__input-container">
            <InputForm
              type="email"
              title="Ваш почтовый адрес"
              placeholder="E-mail"
              name="email"
              state={email}
              setState={setEmail}
            />
            <InputForm
              type="password"
              title="Пароль"
              placeholder="qwerty123"
              name="password"
              state={password}
              setState={setPassword}
            />
          </div>
          <p className="signup-form__err">{errorMsg}</p>
          {error ? <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '12px' }}>{addErrMsg}</p> : null}
          <div className="signup-form__btn-submit-container">
            <Button title={isLoading ? 'Пытаюсь' : 'Зарегистрироваться'} size="forForm" disabled={isLoading} />
          </div>
          <button type="button" onClick={() => nav('/clinic-searcher/signin')} className="signup-form__to-signup">
            <p>Войти</p>
          </button>
        </form>
      </Layout>
    </>
  );
}
