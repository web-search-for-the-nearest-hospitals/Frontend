import './index.scss';

import { SmallCardClinic } from '~/entities/clinic';

export default function ClinicList() {
  return (
    <div className="clinic-list">
      <SmallCardClinic />
      <SmallCardClinic />
      <SmallCardClinic />
    </div>
  );
}
