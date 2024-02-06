import './index.scss';

import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyAuthUserQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';

import { Button, InputForm, Layout } from '~/shared/ui';

// @TODO пока что полный дубликат. Если не изменится, можно подумать о переиспользовании
export default function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [triggerQuery, queryResult] = useLazyAuthUserQuery();
  const { isError, isSuccess, isLoading, error, currentData } = queryResult;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    triggerQuery({ email, password });
  };

  // @TODO переделать хранение данных
  useEffect(() => {
    if (isError) createToast('error', 'Не удалось войти');
    if (isSuccess && currentData) {
      const {
        data: { refresh, access },
      } = currentData;
      localStorage.setItem('clinic-searcher-refresh', refresh);
      localStorage.setItem('clinic-searcher-access', access);
      createToast('success', 'Успешно!');
      nav('/clinic-searcher/main');
    }
  }, [currentData, isError, isSuccess, nav]);

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
        <form className="signin-form" onSubmit={handleSubmit}>
          <h3 className="signin-form__title">Авторизация</h3>
          <div className="signin-form__input-container">
            <InputForm type="email" title="Логин" placeholder="E-mail" name="email" state={email} setState={setEmail} />
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
          <div className="signin-form__btn-submit-container">
            <Button title={isLoading ? 'Пытаюсь' : 'Войти'} size="forForm" disabled={isLoading} />
          </div>
          <button type="button" onClick={() => nav('/clinic-searcher/signup')} className="signin-form__to-signup">
            <p>Зарегистрироваться</p>
          </button>
        </form>
      </Layout>
    </>
  );
}
