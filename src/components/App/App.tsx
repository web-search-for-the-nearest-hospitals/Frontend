import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Header from '../common/Header/Header';
import MapPage from '../pages/MapPage/MapPage';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to={'/main'} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/map" element={<MapPage />} />
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
