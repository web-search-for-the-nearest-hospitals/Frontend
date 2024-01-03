import './ClinicList.scss';

import { ClinicCard } from '../ClinicCard/ClinicCard';

import { clinics } from '~/shared/api/constants';

export default function ClinicList() {
  return (
    <div className="clinic-list">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
}
