import { Route, Routes, Navigate } from 'react-router-dom';

import { MainPage } from './main';
import RegistrationPage from './reg-clinic/ui';
import Header from '~/widgets/header';
import AppointmentForm from '../features/appointment-form/ui';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main/" element={<MainPage />} />
        <Route path="sign-up" element={<RegistrationPage />} />
        <Route path="appointment/:clinicId/" element={<AppointmentForm />} />
      </Route>
      <Route path="*" element={<Navigate to={'/clinic-searcher/main/'} />} />
    </Routes>
  );
};
