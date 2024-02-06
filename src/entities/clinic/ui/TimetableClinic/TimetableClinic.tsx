import cn from 'classnames';

import ico from '~/shared/assets/icons/timetable-arrow-up.svg';

import { useState } from 'react';

import { IOrganizationFromList } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../../lib/getTimetable';

export default function TimetableClinic(clinic: IOrganizationFromList, name: string) {
  const today = new Date().getDay() || 7;
  const [isFullTimetable, setFullTimetable] = useState(false);
  const handleFullTimetable = () => setFullTimetable((val) => !val);

  return (
    <div onClick={handleFullTimetable} className={`clinic-${name}__timetable-period`}>
      <ul className={cn(`clinic-${name}__timetable-list`, isFullTimetable && `clinic-${name}__timetable-list_open`)}>
        {getTimetable(clinic, isFullTimetable, today).map((day, index) => (
          <li key={index} style={{ color: day.isToday ? '#695feb' : '#3b405d' }}>
            {day.text}
          </li>
        ))}
      </ul>
      <img
        src={ico}
        alt="dropdown icon"
        className={cn(`clinic-${name}__timetable-ico`, isFullTimetable && `clinic-${name}__timetable-ico_up`)}
      />
    </div>
  );
}
