import { IOrganization } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../lib/getTimetable';

export default function TimetableList(clinic: IOrganization, name: string) {
  const date = new Date();
  const today = date.getDay() || 7;

  return (
    <ul className={`clinic-${name}__timetable-period`}>
      {getTimetable(clinic).map((day, index) => (
        <li key={index} style={{ color: index + 1 === today ? '#695feb' : '#3b405d' }}>
          {day}
        </li>
      ))}
    </ul>
  );
}
