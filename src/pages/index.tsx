import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '~/components/pages/MainPage/MainPage';
import MapPage from '~/components/pages/MapPage/MapPage';
import ReduxPage from '~/components/pages/ReduxPage/ReduxPage';

import { useAppDispatch } from '../helpers/customHooks/reduxHooks';
import { ICoord, setCoord } from '../store/slices/userSlice';
import { useEffect } from 'react';
import watchUserPosition from '../helpers/utils/watchUserPosition';

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
