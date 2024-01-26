export const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

// Примечание: аббревиатуру можно получить и через slice, но здесь при необходимости можно добавить склонения
export const daysInMonth = {
  0: { name: 'Январь', abbreviation: 'Янв', days: 31 },
  1: { name: 'Февраль', abbreviation: 'Фев', days: 28 }, // Без учёта високосных годов
  2: { name: 'Март', abbreviation: 'Мар', days: 31 },
  3: { name: 'Апрель', abbreviation: 'Апр', days: 30 },
  4: { name: 'Май', abbreviation: 'Май', days: 31 },
  5: { name: 'Июнь', abbreviation: 'Июн', days: 30 },
  6: { name: 'Июль', abbreviation: 'Июл', days: 31 },
  7: { name: 'Август', abbreviation: 'Авг', days: 31 },
  8: { name: 'Сентябрь', abbreviation: 'Сен', days: 30 },
  9: { name: 'Октябрь', abbreviation: 'Окт', days: 31 },
  10: { name: 'Ноябрь', abbreviation: 'Ноя', days: 30 },
  11: { name: 'Декабрь', abbreviation: 'Дек', days: 31 },
};
