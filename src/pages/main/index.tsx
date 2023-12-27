import { CardList } from './ui/CardList';
import { FullCardClinic } from '~/entities/clinic/ui/FullCardClinic';

import Searcher from '~/widgets/searcher-block';

import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '1110px', margin: '0 auto' }}>
        <CardList />
        <div>
          <Searcher />
          <MapBlock />
        </div>
      </div>
      <FullCardClinic />
    </>
  );
}
