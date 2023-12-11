import SearchClinic from '../../../widgets/SearchClinic/ui';
import MapComponent from '../../../widgets/MapComponent/ui';
import { LeftColumn } from './LeftColumn';
export default function MainPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LeftColumn />
      <div>
        <SearchClinic />
        <MapComponent />
      </div>
    </div>
  );
}
