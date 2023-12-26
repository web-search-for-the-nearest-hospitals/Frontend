import Searcher from '~/widgets/searcher-block';

import { LeftColumn } from './ui/LeftColumn';
import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '1110px', margin: '0 auto' }}>
      <LeftColumn />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', flexGrow: 2 }}>
        <Searcher />
        <MapBlock />
      </div>
    </div>
  );
}
