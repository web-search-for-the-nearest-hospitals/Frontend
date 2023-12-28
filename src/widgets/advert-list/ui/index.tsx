import './index.scss';

import { AdvertCard } from '~/entities/advert';

export default function AdvertList() {
  return (
    <div className="advert-list">
      <AdvertCard />
      <AdvertCard />
      <AdvertCard />
    </div>
  );
}
