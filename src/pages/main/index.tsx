import Searcher from '~/widgets/searcher-block';

import { LeftColumn } from './ui/LeftColumn';
import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '1110px', margin: '0 auto' }}>
      <LeftColumn />
      <div>
        <Searcher />
        <MapBlock />
      </div>
    </div>
  );
}
