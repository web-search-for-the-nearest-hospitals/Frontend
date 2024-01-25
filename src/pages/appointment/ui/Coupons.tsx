import './Coupons.scss';
import cn from 'classnames';
import { useState } from 'react';
import { ICoupon } from '~/shared/lib/types/interfaces';

interface ICoupons {
  couponsData: ICoupon[];
}

export default function Coupons({ couponsData }: ICoupons) {
  const [selectedCupon, setSelectedCupon] = useState(couponsData[0]);
  const parseTime = (time: string) =>
    new Date(time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="coupons">
      <h4 className="coupons__title">Свободное время:</h4>
      <ul className="coupons__list">
        {couponsData.map((el, i) => (
          <li
            key={i}
            className={cn('coupons__element', selectedCupon?.id === el.id ? 'coupons__element_selected' : null)}
            onClick={() => setSelectedCupon(el)}
          >
            {parseTime(el.datetime_start)}
          </li>
        ))}
      </ul>
    </section>
  );
}
