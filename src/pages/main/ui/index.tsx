import './index.scss';
import { useEffect, useState } from 'react';

import Searcher from '~/widgets/searcher-block';
import MapBlock from '~/widgets/map-block';

import { ClinicList, FullCardClinic } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';

import { Popup } from '~/shared/ui/index';
import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';
import { IOrganization } from '~/shared/lib/types/interfaces';

// @TODO: вынести на обсуждение все эти кейсы: как показывать, что модуль загружается, как показывать, что данных нет
export default function MainPage() {
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<null | IOrganization>(null);
  const [isVisibleClinic, setIsVisibleClinic] = useState(false);

  function handleCardClick(data: IOrganization) {
    setIsOpen(true);
    setSelectedCard(data);
  }

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setIsVisibleClinic(true);
    }
  }, [data]);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        {!isLoading && isVisibleClinic && data!.results.length === 0 ? <div>Ничего не найдено</div> : null}
        {!isVisibleClinic ? <AdvertList /> : <ClinicList data={data!} handleCardClick={handleCardClick} />}
        {isLoading ? <div>Данные загружаются</div> : null}
      </div>
      <div className="main-page__search-block">
        <Searcher onSearch={triggerQuery} onReset={() => setIsVisibleClinic(false)} />
        <MapBlock clinicData={data} handleCardClick={handleCardClick} />
      </div>
      <Popup isOpen={isOpen} closePopup={() => setIsOpen(false)}>
        {selectedCard ? <FullCardClinic clinic={selectedCard} /> : null}
      </Popup>
    </div>
  );
}
