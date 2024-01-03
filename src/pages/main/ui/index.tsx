import './index.scss';

import Searcher from '~/widgets/searcher-block';

import MapBlock from '~/widgets/map-block';
import { ClinicList, FullCardClinic } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';
import { useState } from 'react';

export default function MainPage() {
  const [isSearch, setSearch] = useState(true);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        <button
          className="main-page__btn"
          onClick={() => {
            setSearch(!isSearch);
          }}
        >
          {isSearch ? 'Показать рекламу' : 'Показать клиники'}
        </button>
        {isSearch ? <ClinicList /> : <AdvertList />}
      </div>
      <div className="main-page__search-block">
        <Searcher />
        <MapBlock />
      </div>
      <FullCardClinic />
    </div>
  );
}
