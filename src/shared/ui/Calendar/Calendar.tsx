import styles from './_Calendar.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { daysOfWeek } from './_consts';
import {
  checkEqualDay,
  getCurRangeString,
  getDay,
  getFirst,
  getLast,
  getMondayDate,
  getToday,
  getWeekDates,
  isPrevDate,
  toIDate,
} from './_lib';
import { IDate } from './_types';

interface ICalendar {
  setDate: (newVal: string) => void;
}

// @TODO есть лишние срабатывания функций. Например getWeekDates при смене selectedCell
export default function Calendar({ setDate }: ICalendar) {
  const [numWeeks] = useState<2>(2);
  const [today] = useState(getToday());
  const [firstDay] = useState(getMondayDate());
  const [curRange, setCurRange] = useState(getWeekDates({ firstDay, numWeeks }));
  const [selectedCell, setSelectedCell] = useState<IDate>(today);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>, isNext: boolean) => {
    e.preventDefault();
    const day = (isNext ? getLast : getFirst)(curRange);
    const date = getDay(day, isNext ? 1 : -numWeeks * 7); // 7 - дней в неделе
    const data = toIDate(date);
    setCurRange(getWeekDates({ firstDay: data, numWeeks }));
  };

  useEffect(() => {
    const { year, month, day } = selectedCell;
    setDate(`${year}-${month + 1}-${day}`);
  }, [selectedCell, setDate]);

  return (
    <table className={styles['calendar']}>
      <thead className="calendar__header">
        <tr>
          <th colSpan={7} style={{ padding: 0 }}>
            <div className={styles['calendar__header-first']}>
              {/* @TODO: заменить на iconbutton, когда он будет */}
              <button
                className={cn(styles['calendar__nav-btn'])}
                onClick={(e) => handleBtnClick(e, false)}
                disabled={checkEqualDay(getFirst(curRange), firstDay)}
              >
                Назад
              </button>
              <p className={styles['calendar__header-text']}>{getCurRangeString(curRange)}</p>
              <button onClick={(e) => handleBtnClick(e, true)}>Вперёд</button>
            </div>
          </th>
        </tr>
        <tr>
          {daysOfWeek.map((day, i) => (
            <th key={i} className={cn(styles['calendar__header-text'])}>
              <p className={cn(styles['calendar__header-second'])}>{day}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {curRange.map((ar, i) => (
          <tr key={i}>
            {ar.map((el, k) => (
              <td key={k} className={cn(styles['calendar__cell'])}>
                <p
                  className={cn(
                    styles['calendar__cell-text'],
                    checkEqualDay(selectedCell, el) ? styles['calendar__cell-text_selected'] : '',
                    isPrevDate(el, today) ? styles['calendar__cell-text_prev'] : '',
                  )}
                  onClick={() => setSelectedCell(el)}
                >
                  {el.day}
                </p>
              </td>
            ))}
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
}
