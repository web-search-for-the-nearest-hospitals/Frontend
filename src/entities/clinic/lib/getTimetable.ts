import { IOrganizationById, IOrganizationFromList } from '~/shared/lib/types/interfaces';

export const getTimetable = (
  clinic: IOrganizationFromList | IOrganizationById,
  isFullTime: boolean,
  todayIndex: number,
) => {
  let fromHours, toHours, hours;

  const getHour = (field: string) => field.slice(0, -3);
  const res = [];
  const days: { [key: number]: string } = {
    1: 'Пн:',
    2: 'Вт:',
    3: 'Ср:',
    4: 'Чт:',
    5: 'Пт:',
    6: 'Сб:',
    7: 'Вс:',
  };

  /**
   * @param i индекс массива от 0 до 6, где 6 - воскресенье
   */
  const getWorkHoursForDay = (i: number) => {
    fromHours = getHour(clinic.business_hours[i]!.from_hour);
    toHours = getHour(clinic.business_hours[i]!.to_hour);
    hours = clinic.is_full_time ? '24ч' : `${fromHours}-${toHours}`;
    return isFullTime ? hours : toHours;
  };

  const getTimetableOnDay = (i: number) => {
    const isExist = clinic.business_hours[i - 1]?.day !== undefined; // индексация от 0 до 6
    const aboutDay = !isFullTime && isExist ? 'работает до: ' : days[i];
    const workHours = isExist ? getWorkHoursForDay(i - 1) : 'выходной';
    return `${aboutDay} ${workHours}`;
  };

  for (let i = 1; i < 8; i++) {
    const isToday = i === todayIndex;
    const dayData = { text: getTimetableOnDay(i), isToday };

    if (!isFullTime && isToday) {
      return [dayData];
    } else {
      res.push(dayData);
    }
  }

  return res;
};
