import { Route, Routes, Navigate } from 'react-router-dom';

import { MainPage } from './main';
import Header from '~/widgets/header';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main" element={<MainPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/clinic-searcher/main'} />} />
    </Routes>
  );
};
