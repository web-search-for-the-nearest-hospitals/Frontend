import './index.scss';

import { useState } from 'react';

import ClinicList from '~/widgets/clinic-list';
import AdvertList from '~/widgets/advert-list';

export const CardList = () => {
  // временные стейт и кнопка для проверки верстки
  const [isSearch, setSearch] = useState(true);

  return (
    <>
      <div className="card-list">
        <button
          onClick={() => {
            setSearch(!isSearch);
          }}
        >
          change
        </button>
        {isSearch ? <ClinicList /> : <AdvertList />}
      </div>
    </>
  );
};
