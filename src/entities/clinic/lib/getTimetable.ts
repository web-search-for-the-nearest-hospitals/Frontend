import { IOrganizationFromList } from '~/shared/lib/types/interfaces';

export const getTimetable = (clinic: IOrganizationFromList) => {
  let fromHours, toHours, hours;

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

  for (let i = 0; i < 7; i++) {
    if (clinic.business_hours[i]?.day !== undefined) {
      fromHours = clinic.business_hours[i]!.from_hour.slice(0, -3);
      toHours = clinic.business_hours[i]!.to_hour.slice(0, -3);
      hours = fromHours === toHours ? '24ч' : `${fromHours}-${toHours}`;
      res.push(`${days[i + 1]} ${hours}`);
    } else {
      res.push(`${days[i + 1]} Выходной`);
    }
  }

  return res;
};
