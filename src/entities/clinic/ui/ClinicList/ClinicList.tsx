import './ClinicList.scss';

import { ClinicCard } from '../ClinicCard/ClinicCard';

import { IClinicListData } from '~/shared/lib/types/interfaces';
import { districtDefault } from '~/widgets/map-block';

interface IClinicList {
  data: IClinicListData;
  district: string;
}

export default function ClinicList({ data, district }: IClinicList) {
  return (
    <div className="clinic-list">
      <div className="clinic-list__container">
        {data.results
          .filter((clinic) => (district === districtDefault ? true : clinic.district === district))
          .map((clinic) => (
            <ClinicCard key={`${clinic.latitude}${clinic.longitude}`} clinic={clinic} />
          ))}
      </div>
    </div>
  );
}
