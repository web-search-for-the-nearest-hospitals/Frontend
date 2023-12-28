import './index.scss';

import { useState } from 'react';

import { AdvertList } from '~/entities/advert';
import { ClinicList } from '~/entities/clinic';

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
