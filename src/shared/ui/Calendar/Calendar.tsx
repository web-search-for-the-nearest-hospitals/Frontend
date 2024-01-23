import cn from 'classnames';
import styles from './_Calendar.module.scss';
import { daysOfWeek } from './_consts';
import { useState } from 'react';
import {
  checkEqualDay,
  getCurRangeString,
  getDay,
  getFirst,
  getLast,
  getMondayDate,
  getWeekDates,
  toIDate,
} from './_lib';

// @TODO есть лишние срабатывания функций. Например getWeekDates при смене selectedCell
export default function Calendar() {
  const [numWeeks] = useState<2>(2);
  const [firstDay] = useState(getMondayDate());
  const [curRange, setCurRange] = useState(getWeekDates({ firstDay, numWeeks }));
  const [selectedCell, setSelectedCell] = useState(getFirst(curRange));

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>, isNext: boolean) => {
    e.preventDefault();
    const day = (isNext ? getLast : getFirst)(curRange);
    const date = getDay(day, isNext ? 1 : -numWeeks * 7); // 7 - дней в неделе
    const data = toIDate(date);
    setCurRange(getWeekDates({ firstDay: data, numWeeks }));
  };

  return (
    <table className={styles['calendar']}>
      <thead className="calendar__header">
        <tr>
          <th colSpan={7} className={cn(styles['calendar__'])}>
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
        <tr className="calendar__header-second">
          {daysOfWeek.map((day, i) => (
            <th key={i} className={styles['calendar__header-text']}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {curRange.map((ar, i) => (
          <tr key={i}>
            {ar.map((el, k) => (
              <td
                key={k}
                className={cn(
                  styles['calendar__cell-text'],
                  checkEqualDay(selectedCell, el) ? styles['calendar__cell-text_selected'] : '',
                )}
                onClick={() => setSelectedCell(el)}
              >
                {el.day}
              </td>
            ))}
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
}
