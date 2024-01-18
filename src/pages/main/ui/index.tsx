import './index.scss';
import { useEffect, useState } from 'react';

import Searcher from '~/widgets/searcher-block';
import MapBlock from '~/widgets/map-block';

import { ClinicList, FullCardClinic } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';

import { Popup } from '~/shared/ui/index';
import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import { createToast } from '~/shared/lib';
import { IOrganization } from '~/shared/lib/types/interfaces';

export default function MainPage() {
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<null | IOrganization>(null);

  function handleCardClick(data: IOrganization) {
    setIsOpen(true);
    setSelectedCard(data);
  }

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    }
  }, [isError]);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        {!isLoading && data && data.results.length === 0 ? <div>Ничего не найдено</div> : null}
        {!data ? <AdvertList /> : <ClinicList data={data} handleCardClick={handleCardClick} />}
        {isLoading ? <div>Данные загружаются</div> : null}
      </div>
      <div className="main-page__search-block">
        <Searcher onClick={triggerQuery} />
        <MapBlock clinicData={data} handleCardClick={handleCardClick} />
      </div>
      {selectedCard ? (
        <Popup isOpen={isOpen}>
          <FullCardClinic isClose={() => setIsOpen(false)} clinic={selectedCard} />
        </Popup>
      ) : null}
    </div>
  );
}
