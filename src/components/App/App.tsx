import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Header from '../common/Header/Header';
import MapPage from '../pages/MapPage/MapPage';
import './App.css';
import { useAppDispatch } from '../../helpers/customHooks/reduxHooks';
import { ICoord, setCoord } from '../../store/slices/userSlice';
import { useEffect } from 'react';
import watchUserPosition from '../../helpers/utils/watchUserPosition';
import SearchClinic from '../common/SearchClinic/SearchClinic';
import MapComponent from '../common/MapComponent/MapComponent';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    watchUserPosition((data: ICoord) => dispatch(setCoord(data)));
  }, [dispatch]);

  return (
    <>
      <Header />
      <SearchClinic />
      <MapComponent />
      <Routes>
        {/* <Route path="/clinic-searcher">
          <Route path="main" element={<MainPage />} />
          <Route path="map" element={<MapPage />} />
          <Route index element={<Navigate to={'/clinic-searcher/main'} />} />
        </Route> */}

        {/* <Route path="/login" element={<ProtectOfRoute Element={Login} />} />
        <Route path="/register" element={<ProtectOfRoute Element={Register} />} />
        <Route path="/change-password" element={<ProtectOfRoute Element={ChangePassword} />} />
        <Route path="/confirm-password" element={<ProtectOfRoute Element={ConfirmPassword} />} />
        <Route path="/" element={<ProtectOfRoute Element={AddHeader} onlyLoggedIn />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/vacancy" element={<Vacancy />} />
          <Route path="/create-vacancy" element={<CreateVacancy />} />
          <Route path="/favorite-candidates" element={<Favorite />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route index element={<Navigate to={'/candidates'} />} />
        </Route>
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
