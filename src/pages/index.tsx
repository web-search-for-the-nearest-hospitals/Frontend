import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '~/shared/helpers/customHooks/reduxHooks';
import watchUserPosition from '~/shared/helpers/utils/watchUserPosition';
import { setCoord } from '~/shared/store/slices/userSlice';
import { ICoord } from '~/shared/types/interfaces';

import MainPage from './MainPage';
import ReduxPage from './ReduxPage';

export const Routing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/clinic-searcher">
        <Route path="main" element={<MainPage />} />
        <Route path="redux" element={<ReduxPage />} />
        <Route index element={<Navigate to={'/clinic-searcher/main'} />} />
      </Route>
    </Routes>
  );
};
