import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from '../pages/MainPage/MainPage';
import Header from '../common/Header/Header';
import MapPage from '../pages/MapPage/MapPage';
import CallMedicPage from '../pages/CallMedicPage/CallMedicPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/clinic-searcher">
          <Route path="main" element={<MainPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="call-medic" element={<CallMedicPage />} />
          <Route index element={<Navigate to={'/clinic-searcher/main'} />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
