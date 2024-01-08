import { Route, Routes, Navigate } from 'react-router-dom';

import { MainPage } from './main';
import Header from '~/widgets/header';
import AppointmentPage from './appointment';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main" element={<MainPage />} />
        <Route path="appointment" element={<AppointmentPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/clinic-searcher/main'} />} />
    </Routes>
  );
};
