import './index.scss';

import { CardList } from './ui/CardList';

import Searcher from '~/widgets/searcher-block';

import MapBlock from '~/widgets/map-block';

export default function MainPage() {
  return (
    <div className="main-page">
      <CardList />
      <div>
        <Searcher />
        <MapBlock />
      </div>
    </div>
  );
}
