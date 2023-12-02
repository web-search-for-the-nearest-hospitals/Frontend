import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Header from '../Header/Header';
import Map from '../MapPage/MapPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to={'/main'} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/map" element={<Map />} />
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
