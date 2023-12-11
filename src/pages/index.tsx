import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import MainPage from './main';
import ReduxPage from './redux';
import Header from '~/widgets/header';

import { ICoord } from '~/shared/types/interfaces';
import { setCoord } from '~/shared/config/store/slices/userSlice';
import { useAppDispatch } from '~/shared/lib/hooks/reduxHooks';
import watchUserPosition from '~/shared/lib/utils/watchUserPosition';

export const Routing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
  }, [dispatch]);

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
