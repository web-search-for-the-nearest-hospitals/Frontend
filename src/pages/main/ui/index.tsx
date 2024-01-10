import './index.scss';
import { useState, useEffect } from 'react';

import Searcher from '~/widgets/searcher-block';
import MapBlock from '~/widgets/map-block';
import { ClinicList, FullCardClinic } from '~/entities/clinic';
import { AdvertList } from '~/entities/advert';
import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import { IGetOrganizations } from '~/shared/lib/types/interfaces';
import { createToast } from '~/shared/lib';

export default function MainPage() {
  const [isSearch, setSearch] = useState(false);
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    if (isSearch) {
      triggerQuery(null as unknown as IGetOrganizations);
    }
  }, [triggerQuery, isSearch]);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    }
  }, [isError]);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        {isSearch && !isLoading && data ? <ClinicList data={data} setIsOpenPopup={setIsOpenPopup} /> : null}
        {!isSearch ? <AdvertList /> : null}
        {isSearch && isLoading && !data ? <div>Данные загружаются</div> : null}
      </div>
      <div className="main-page__search-block">
        <Searcher setSearch={setSearch} />
        <MapBlock clinicData={data} />
      </div>
      <FullCardClinic isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup} />
    </div>
  );
}
