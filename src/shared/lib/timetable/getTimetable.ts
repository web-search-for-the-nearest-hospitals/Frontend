import { IOrganization } from '~/shared/lib/types/interfaces';

type day = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const getTimetable = (clinic: IOrganization) => {
  let fromHours, toHours;
  const weekdays = clinic.business_hours.map((weekday) => {
    fromHours = weekday.from_hour.slice(0, -3);
    toHours = weekday.to_hour.slice(0, -3);

    const hours = fromHours === toHours ? '24ч' : `${fromHours}-${toHours}`;

    switch (weekday.day as day) {
      case 1:
        return `Пн: ${hours}`;
      case 2:
        return `Вт: ${hours}`;
      case 3:
        return `Ср: ${hours}`;
      case 4:
        return `Чт: ${hours}`;
      case 5:
        return `Пт: ${hours}`;
      case 6:
        return `Сб: ${hours}`;
      case 7:
        return `Вс: ${hours}`;
    }
  });

  return weekdays;
};
