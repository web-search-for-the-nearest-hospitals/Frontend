import Searcher from '~/widgets/searcher-block';

import { LeftColumn } from './ui/LeftColumn';
import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LeftColumn />
      <div>
        <Searcher />
        <MapBlock />
      </div>
    </div>
  );
}
