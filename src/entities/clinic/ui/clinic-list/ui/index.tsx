import './index.scss';

import { ClinicCard } from '../../ClinicCard';

export default function ClinicList() {
  return (
    <div className="clinic-list">
      <ClinicCard />
      <ClinicCard />
      <ClinicCard />
    </div>
  );
}
