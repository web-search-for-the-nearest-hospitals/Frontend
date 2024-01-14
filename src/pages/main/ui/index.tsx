import './index.scss';
import { useEffect } from 'react';

import Searcher from '~/widgets/searcher-block';
import MapBlock from '~/widgets/map-block';
import { ClinicList } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';
import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import { createToast } from '~/shared/lib';

// @TODO: вынести на обсуждение все эти кейсы: как показывать, что модуль загружается, как показывать, что данных нет
export default function MainPage() {
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    }
  }, [isError]);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        {!isLoading && data && data.results.length === 0 ? <div>Ничего не найдено</div> : null}
        {!data ? <AdvertList /> : <ClinicList isLoading={isLoading} data={data} />}
        {isLoading ? <div>Данные загружаются</div> : null}
      </div>
      <div className="main-page__search-block">
        <Searcher onClick={triggerQuery} />
        <MapBlock clinicData={data} />
      </div>
    </div>
  );
}
