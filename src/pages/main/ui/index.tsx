import './index.scss';
import NotFoundIco from '~/shared/assets/icons/not-found-ico.svg';
import { useEffect, useState } from 'react';

import Searcher from '~/widgets/searcher-block';
import { districtDefault } from '~/widgets/map-block';
import MapBlock from '~/widgets/map-block';

import { ClinicList } from '~/entities/clinic';
// Убрать, если отказываемся от рекламы
// import { AdvertList } from '~/entities/advert';

import { useLazyGetOrganizationsQuery } from '~/shared/api/rtkqueryApi';
import createToast from '~/shared/lib/toast/createToast';

// @TODO: вынести на обсуждение все эти кейсы: как показывать, что модуль загружается, как показывать, что данных нет
export default function MainPage() {
  const [triggerQuery, queryResult] = useLazyGetOrganizationsQuery();
  const { data, isLoading, isError } = queryResult;
  const [isVisibleClinic, setIsVisibleClinic] = useState(false);
  const [district, setDistrict] = useState(districtDefault);

  useEffect(() => {
    if (isError) {
      createToast('error', 'Не удалось получить список поликлиник');
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setIsVisibleClinic(true);
      if (data.results.length === 0) createToast('info', 'Кажется, в нашей базе не нашлось подходящих клиник');
    }
  }, [data]);

  return (
    <div className="main-page">
      <div className="main-page__card-list">
        {!isLoading && isVisibleClinic && data!.results.length === 0 ? (
          <div className="main-page__not-found">
            <img src={NotFoundIco} alt="Не найдено" className="main-page__not-found-ico" />
            <p className="main-page__not-found-text">Не найдено</p>
          </div>
        ) : null}
        {isVisibleClinic && <ClinicList data={data!} district={district} />}
        {isLoading ? <div>Данные загружаются</div> : null}
      </div>
      <div className="main-page__search-block">
        <Searcher onSearch={triggerQuery} />
        <MapBlock clinicData={data} district={district} setDistrict={setDistrict} />
      </div>
    </div>
  );
}
