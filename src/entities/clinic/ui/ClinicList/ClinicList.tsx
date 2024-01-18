import './ClinicList.scss';
import { ClinicCard } from '../ClinicCard/ClinicCard';
import { IClinicListData, IOrganization } from '~/shared/lib/types/interfaces';

interface IClinicList {
  data: IClinicListData;
  handleCardClick: (data: IOrganization) => void;
}

export default function ClinicList({ data, handleCardClick }: IClinicList) {
  return (
    <div className="clinic-list">
      {data.results.map((clinic) => (
        <ClinicCard key={`${clinic.latitude}${clinic.longitude}`} clinic={clinic} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}
