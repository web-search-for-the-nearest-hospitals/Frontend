// Просто способ разбить строку
type TWeek1 = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type TWeek2 = 8 | 9 | 10 | 11 | 12 | 13 | 14;
type TWeek3 = 15 | 16 | 17 | 18 | 19 | 20 | 21;
type TWeek4 = 22 | 23 | 24 | 25 | 26 | 27 | 28;
export type TDay = TWeek1 | TWeek2 | TWeek3 | TWeek4 | 29 | 30 | 31;

export type TMonth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // 0 - Январь, 11 - Декабрь

export type TDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IDate {
  year: number;
  month: TMonth;
  day: TDay;
}

export interface IToday extends IDate {
  dayOfWeek: TDayOfWeek;
}

export interface IGetWeekDates {
  firstDay: IDate;
  numWeeks: 1 | 2 | 3 | 4;
}
