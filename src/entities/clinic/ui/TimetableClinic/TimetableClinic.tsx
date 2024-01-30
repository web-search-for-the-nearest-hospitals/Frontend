import { IOrganization } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../../lib/getTimetable';
import { useState } from 'react';
import ico from '~/shared/assets/icons/timetable-arrow-up.svg';

export default function TimetableClinic(clinic: IOrganization, name: string) {
  const date = new Date();
  const today = date.getDay() || 7;

  const [isFullTimetable, setFullTimetable] = useState(false);
  const handleFullTimetable = () => {
    setFullTimetable(!isFullTimetable);
  };

  const whatToShow = (day: string, index: number) => {
    if (index + 1 === today && day.includes('Выходной') === true) {
      return `${day.slice(4)}`;
    }
    return index + 1 === today && `Открыто до: ${day.slice(-5)}`;
  };

  return (
    <div onClick={handleFullTimetable} className={`clinic-${name}__timetable-period`}>
      <ul style={{ color: '#695feb' }}>
        {getTimetable(clinic).map((day, index) =>
          isFullTimetable ? (
            <li key={index} style={{ color: index + 1 === today ? '#695feb' : '#3b405d' }}>
              {day}
            </li>
          ) : (
            whatToShow(day, index)
          ),
        )}
      </ul>
      <img
        src={ico}
        alt="dropdown icon"
        className={
          isFullTimetable
            ? `clinic-${name}__timetable-ico clinic-${name}__timetable-ico_up`
            : `clinic-${name}__timetable-ico`
        }
      />
    </div>
  );
}
