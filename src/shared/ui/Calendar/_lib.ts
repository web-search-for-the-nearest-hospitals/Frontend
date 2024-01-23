import { daysInMonth } from './_consts';

type TWeek1 = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type TWeek2 = 8 | 9 | 10 | 11 | 12 | 13 | 14;
type TWeek3 = 15 | 16 | 17 | 18 | 19 | 20 | 21;
type TWeek4 = 22 | 23 | 24 | 25 | 26 | 27 | 28;
type TDay = TWeek1 | TWeek2 | TWeek3 | TWeek4 | 29 | 30 | 31;
type TMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // 0 - Январь, 11 - Декабрь

interface IDate {
  year: number;
  month: TMonth;
  day: TDay;
}

function getIsLeapYear(year: number) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function getCurMonthMaxDay(year: number, month: TMonth) {
  const isLeapYear = getIsLeapYear(year);
  const isFebr = month === 1;
  return isLeapYear && isFebr ? 29 : daysInMonth[month].days;
}

export function getDay({ year, month, day }: IDate, step: number) {
  return new Date(year, month, day + step);
}

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

export function getMondayDate() {
  const today = new Date();
  const currentDay = today.getDate();
  const dayOfWeek = today.getDay();
  const mondayDate = currentDay - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

  const result = {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: mondayDate,
  };

  return result as IDate;
}

interface IGetWeekDates {
  firstDay: IDate;
  numWeeks: 1 | 2 | 3 | 4;
}

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

export function getCurRangeString(curRange: IDate[][]) {
  const first = getFirst(curRange);
  const last = getLast(curRange);
  const getStr = (day: IDate) => `${day?.day} ${daysInMonth[day!.month].abbreviation}`;
  return `${getStr(first)} - ${getStr(last)}`;
}
