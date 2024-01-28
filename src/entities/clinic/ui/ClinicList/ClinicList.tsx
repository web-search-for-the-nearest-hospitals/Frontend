import './ClinicList.scss';

import { ClinicCard } from '../ClinicCard/ClinicCard';
import { IClinicListData, IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicList {
  data: IClinicListData;
  handleCardClick: (data: IOrganization) => void;
  districtFilter: string;
}

export default function ClinicList({ data, handleCardClick, districtFilter }: IClinicList) {
  const filteredClinics: any[] = [];

  data.results.map((result) => {
    if (result.district === districtFilter) filteredClinics.push(result);
  });

  return (
    <div className="clinic-list">
      <div className="clinic-list__container">
        {filteredClinics.map((clinic) => (
          <ClinicCard key={`${clinic.latitude}${clinic.longitude}`} clinic={clinic} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
