import './ClinicList.scss';
import { ClinicCard } from '../ClinicCard/ClinicCard';
import { IClinicListData } from '~/shared/lib/types/interfaces';

interface IClinicList {
  data: IClinicListData;
  isLoading: boolean;
}

export default function ClinicList({ data }: IClinicList) {
  return (
    <div className="clinic-list">
      <div className="clinic-list__container">
        {data.results.map((clinic) => (
          <ClinicCard key={`${clinic.latitude}${clinic.longitude}`} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
