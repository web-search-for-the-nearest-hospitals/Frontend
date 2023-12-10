import SearchClinic from './SearchClinic/SearchClinic';
import MapComponent from './MapComponent/MapComponent';
export default function MainPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ minWidth: '30vw' }}>колонка рекламы</div>
      <div>
        <SearchClinic />
        <MapComponent />
      </div>
    </div>
  );
}
