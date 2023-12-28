import './index.scss';

import { CardList } from '~/widgets/card-list/ui';

import Searcher from '~/widgets/searcher-block';

import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <div className="main-page">
      <CardList />
      <div className="main-page__search-block">
        <Searcher />
        <MapBlock />
      </div>
    </div>
  );
}
