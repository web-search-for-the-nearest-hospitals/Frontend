import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import RegistrationPage from './reg-clinic/ui';
import { MainPage } from './main';
import SignIn from './signin/ui';
import SignUp from './signup/ui';
import ClinicPage from './clinic/clinic';

import Header from '~/widgets/header';
import createToast from '~/shared/lib/toast/createToast';
import AppointmentForm from '../features/appointment-form/ui';

export const Routing = () => {
  // @TODO заменить нормальной проверкой токена
  useEffect(() => {
    if (localStorage.getItem('clinic-searcher-access')) {
      createToast(
        'info',
        'Если с момента последнего входа прошло более суток - войдите пожалуйста снова, иначе не получится записаться на приём',
      );
    } else {
      createToast('info', 'Вы не авторизованы, вы не сможете записаться на приём без авторизации');
    }
  });
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main/" element={<MainPage />} />
        <Route path="sign-up" element={<RegistrationPage />} />
        <Route path="appointment/:clinicId/" element={<AppointmentForm />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="card/:clinicId/" element={<ClinicPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/clinic-searcher/main/'} />} />
    </Routes>
  );
};
