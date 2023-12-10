import { Route, Routes, Navigate } from 'react-router-dom';
import MapPage from '~/pages/MapPage/MapPage';
import ReduxPage from '~/pages/ReduxPage/ReduxPage';

import { useEffect } from 'react';
import { useAppDispatch } from '~/shared/helpers/customHooks/reduxHooks';
import watchUserPosition from '~/shared/helpers/utils/watchUserPosition';
import { ICoord, setCoord } from '~/shared/store/slices/userSlice';
import MainPage from './MainPage/MainPage';

export const Routing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/clinic-searcher">
        <Route path="main" element={<MainPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="redux" element={<ReduxPage />} />
        <Route index element={<Navigate to={'/clinic-searcher/main'} />} />
      </Route>
    </Routes>
  );
};
