import './index.scss';

import Searcher from '~/widgets/searcher-block';

import MapBlock from '~/widgets/map-block';
import { ClinicList } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';
import { useState } from 'react';
import { Button } from '~/shared/ui';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const [isSearch, setSearch] = useState(true);
  const navigate = useNavigate();

  const redirectToAppointment = () => {
    navigate('/clinic-searcher/appointment');
  };

  return (
    <>
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
      </div>
      <Button type="button" size="l" title="Переход на форму записи к врачу" onClick={redirectToAppointment} />
    </>
  );
}
