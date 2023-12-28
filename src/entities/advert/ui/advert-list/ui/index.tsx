import './index.scss';

import { AdvertCard } from '../../AdvertCard';

export default function AdvertList() {
  return (
    <div className="advert-list">
      <AdvertCard />
      <AdvertCard />
      <AdvertCard />
    </div>
  );
}
