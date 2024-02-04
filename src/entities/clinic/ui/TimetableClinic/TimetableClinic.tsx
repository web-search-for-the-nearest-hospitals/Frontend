import cn from 'classnames';

import ico from '~/shared/assets/icons/timetable-arrow-up.svg';

import { useState } from 'react';

import { IOrganization } from '~/shared/lib/types/interfaces';
import { getTimetable } from '../../lib/getTimetable';

export default function TimetableClinic(clinic: IOrganization, name: string) {
  const date = new Date();
  const today = date.getDay() || 7;

  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const whatToShow = (day: string, index: number) => {
    if (index + 1 === today && day.includes('Выходной') === true) {
      /** Что приходит в day: 'Сб: Выходной'
       * Что получаем после day.slice(4): 'Выходной'
       */
      return `${day.slice(4)}`;
    }
    /** Что приходит в day: 'Пн: 10:00-20:00'
     * Что получаем после day.slice(-5): '20:00'
     */
    return index + 1 === today && `Открыто до: ${day.slice(-5)}`;
  };

  return (
    <div onClick={handleOpen} className={`clinic-${name}__timetable-period`}>
      <ul className={cn(`clinic-${name}__timetable-list`, isOpen && `clinic-${name}__timetable-list_open`)}>
        {getTimetable(clinic).map((day, index) =>
          isOpen ? (
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
        className={cn(`clinic-${name}__timetable-ico`, isOpen && `clinic-${name}__timetable-ico_up`)}
      />
    </div>
  );
}
