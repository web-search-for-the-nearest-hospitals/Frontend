import './ClinicList.scss';
import { ClinicCard } from '../ClinicCard/ClinicCard';
import { IClinicListData, IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicList {
  data: IClinicListData;
  handleCardClick: (data: IOrganization) => void;
}

export default function ClinicList({ data, handleCardClick }: IClinicList) {
  console.log(data);
  return (
    <div className="clinic-list">
      <div className="clinic-list__container">
        {data.results.map((clinic) => (
          <ClinicCard key={`${clinic.latitude}${clinic.longitude}`} clinic={clinic} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}
