import { IOrganization } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../../lib/getTimetable';
import { useState } from 'react';
import { ClinicDownBtn, ClinicUpBtn } from '~/shared/assets';

export default function TimetableClinic(clinic: IOrganization, name: string) {
  const date = new Date();
  const today = date.getDay() || 7;

  const [isFullTimetable, setFullTimetable] = useState(false);
  const handleFullTimetable = () => {
    setFullTimetable(!isFullTimetable);
  };

  return (
    <div onClick={handleFullTimetable} className={`clinic-${name}__timetable-period`}>
      <ul>
        {getTimetable(clinic).map((day, index) =>
          isFullTimetable ? (
            <li key={index} style={{ color: index + 1 === today ? '#695feb' : '#3b405d' }}>
              {day}
            </li>
          ) : (
            <li key={index} style={{ color: '#695feb' }}>
              {index + 1 === today && day.includes('Выходной') === true
                ? `${day.slice(4)}`
                : index + 1 === today && `Открыто до: ${day.slice(-5)}`}
            </li>
          ),
        )}
      </ul>
      {isFullTimetable ? <ClinicUpBtn /> : <ClinicDownBtn />}
    </div>
  );
}
