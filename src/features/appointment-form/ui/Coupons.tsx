import './Coupons.scss';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { ICoupon } from '~/shared/lib/types/interfaces';

interface ICoupons {
  selectedCoupon: ICoupon | null;
  couponsData: ICoupon[];
  setSelectedCoupon: (val: ICoupon | null) => void;
}

export default function Coupons({ couponsData, selectedCoupon, setSelectedCoupon }: ICoupons) {
  const [isActiveList, setIsActiveList] = useState(false);
  const ref = useRef<HTMLUListElement | null>(null);

  const parseTime = (time: string) =>
    new Date(time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const getIsListOverflow = () => (ref.current?.scrollHeight || 0) > (ref.current?.offsetHeight || 0);

  const onKey = (e: React.KeyboardEvent<HTMLElement>, data: ICoupon) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedCoupon(data);
    }
  };

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActiveList((prev) => !prev);
  };

  return (
    <section className="coupons">
      <h4 className="coupons__title">Свободное время:</h4>
      <ul className={cn('coupons__list', isActiveList && 'coupons__list_active')} ref={ref}>
        {couponsData.map((el, i) => (
          <li
            key={i}
            className={cn('coupons__element', selectedCoupon?.id === el.id ? 'coupons__element_selected' : null)}
            onClick={() => setSelectedCoupon(el)}
            onKeyDown={(e) => onKey(e, el)}
            tabIndex={0}
          >
            {parseTime(el.datetime_start)}
          </li>
        ))}
        {getIsListOverflow() ? (
          <button
            className={cn('coupons__list-toggle', isActiveList && 'coupons__list-toggle_active')}
            onClick={handleBtnClick}
          />
        ) : null}
      </ul>
    </section>
  );
}
