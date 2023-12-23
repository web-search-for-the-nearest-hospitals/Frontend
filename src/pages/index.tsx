import { Route, Routes, Navigate } from 'react-router-dom';

import MainPage from './main';
import ReduxPage from './redux';
import Header from '~/widgets/header';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/clinic-searcher" element={<Header />}>
        <Route path="main" element={<MainPage />} />
        <Route path="redux" element={<ReduxPage />} />
        <Route index element={<Navigate to={'/clinic-searcher/main'} />} />
      </Route>
    </Routes>
  );
};
