import './AdvertList.scss';

import AdvertCard from '../AdvertCard/AdvertCard';

import { adverts } from '~/shared/api/constants';

export default function AdvertList() {
  return (
    <div className="advert-list">
      <div className="advert-list__container">
        {adverts.map((advert) => (
          <AdvertCard key={advert.id} advert={advert} />
        ))}
      </div>
    </div>
  );
}
