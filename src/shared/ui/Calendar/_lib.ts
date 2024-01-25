import { daysInMonth } from './_consts';
import { TMonth, IDate, IGetWeekDates, TDay, IToday, TDayOfWeek } from './_types';

function getIsLeapYear(year: number) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function getCurMonthMaxDay(year: number, month: TMonth) {
  const isLeapYear = getIsLeapYear(year);
  const isFebr = month === 1;
  return isLeapYear && isFebr ? 29 : daysInMonth[month].days;
}

/**
 * Возвращает новую дату, полученную прибавлением указанного количества дней к исходной дате.
 * @param date - Исходная дата.
 * @param step - Количество дней для прибавления (или вычитания, если отрицательное значение).
 * @returns Новая дата после прибавления указанного количества дней.
 */
export function getDay({ year, month, day }: IDate, step: number) {
  return new Date(year, month, day + step);
}

/**
 * Преобразует объект Date в объект типа IDate.
 * @param date - Объект Date для преобразования.
 * @returns Объект типа IDate.
 */
export function toIDate(date: Date) {
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() } as IDate;
}

export function getLast(ar: IDate[][]) {
  const l = ar.length;
  const lweek = ar[0]!.length;
  const last = ar[l - 1]![lweek - 1]!;
  return last;
}

export function getFirst(ar: IDate[][]) {
  return ar[0]![0]!;
}

export function getToday(isIToday: true): IToday;
export function getToday(): IDate;

/**
 * Получает информацию о текущей дате.
 * @param {boolean} isIToday - Определяет, нужно ли включить информацию о текущем дне недели.
 * @returns {TDateInfo} - Объект с информацией о текущей дате.
 */
export function getToday(isIToday?: true) {
  const today = new Date();
  const data = {
    year: today.getFullYear(),
    month: today.getMonth() as TMonth,
    day: today.getDate() as TDay,
  };
  if (isIToday) {
    (data as IToday).dayOfWeek = today.getDay() as TDayOfWeek;
  }
  return data;
}

export function getMondayDate() {
  const { year, month, day, dayOfWeek } = getToday(true);
  const mondayDate = day - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // вс: -6, пн: -0

  const result = {
    year: year,
    month: month,
    day: mondayDate,
  };

  return result as IDate;
}

/**
 * Возвращает двумерный массив дат, представляющий недели, начиная с указанной даты.
 * @param firstDay - Первый день для расчета недель.
 * @param numWeeks - Количество недель.
 * @returns Двумерный массив дат, представляющий недели.
 */
export function getWeekDates({ firstDay, numWeeks }: IGetWeekDates) {
  const result = [];
  const { day, month, year } = firstDay;
  let curDay = day;
  let curMonth = month;
  let curYear = year;
  let thisMonthMaxDay = getCurMonthMaxDay(curYear, curMonth);

  for (let i = 0; i < numWeeks; i++) {
    const ar = [];
    for (let k = 0; k < 7; k++) {
      if (i === 0 && k === 0) {
        ar.push(firstDay);
      } else {
        if (curDay > thisMonthMaxDay) {
          const nextDate = getDay({ year: curYear, month: curMonth, day: curDay }, 1);
          curDay = 1;
          curMonth = nextDate.getMonth() as TMonth;
          curYear = nextDate.getFullYear();
          thisMonthMaxDay = getCurMonthMaxDay(curYear, curMonth);
        }
        const date = { year: curYear, month: curMonth, day: curDay };
        ar.push(date);
      }
      curDay++;
    }
    result.push(ar);
  }

  return result;
}

export function checkEqualDay(day1: IDate, day2: IDate) {
  for (const [key, val] of Object.entries(day1)) {
    if (day2[key as keyof IDate] !== val) return false;
  }
  return true;
}

/**
 * Возвращает строковое представление текущего диапазона дат.
 * @param curRange - Двумерный массив дат, представляющий текущий диапазон.
 * @returns Строка, представляющая текущий диапазон дат в формате "день месяца - день месяца".
 */
export function getCurRangeString(curRange: IDate[][]) {
  const first = getFirst(curRange);
  const last = getLast(curRange);
  const getStr = (day: IDate) => `${day?.day} ${daysInMonth[day!.month].abbreviation}`;
  return `${getStr(first)} - ${getStr(last)}`;
}

/**
 * Проверяет, является ли первая дата предшествующей второй.
 * @param day1 - Первая дата.
 * @param day2 - Вторая дата.
 * @returns Возвращает true, если первая дата предшествует второй, иначе - false.
 */
export function isPrevDate(day1: IDate, day2: IDate) {
  const { year: y1, month: m1, day: d1 } = day1;
  const { year: y2, month: m2, day: d2 } = day2;
  return y1 < y2 || (y1 === y2 && m1 < m2) || (y1 === y2 && m1 === m2 && d1 < d2);
}
