import { Route, Routes, Navigate } from 'react-router-dom';

import { MainPage } from './main';
import RegistrationPage from './reg-clinic/ui';
import Header from '~/widgets/header';
import AppointmentForm from '../features/appointment-form/ui';
import ClinicPage from './clinic/clinic';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main/" element={<MainPage />} />
        <Route path="sign-up" element={<RegistrationPage />} />
        <Route path="appointment/:clinicId/" element={<AppointmentForm />} />
        <Route path="card/:clinicId/" element={<ClinicPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/clinic-searcher/main/'} />} />
    </Routes>
  );
};
