import './Coupons.scss';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { ICoupon } from '~/shared/lib/types/interfaces';

interface ICoupons {
  selectedCoupon: ICoupon | null;
  couponsData: {
    isError: boolean;
    isFetching: boolean;
    currentData?: ICoupon[];
  } | null;
  setSelectedCoupon: (val: ICoupon | null) => void;
}

export default function Coupons({ couponsData, selectedCoupon, setSelectedCoupon }: ICoupons) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [isActiveList, setIsActiveList] = useState(false);

  const parseTime = (time: string) =>
    new Date(time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  //через console.log выяснено значение в 36 для scrollHeight, когда нет переполнения
  const getIsListOverflow = () => (ref.current?.scrollHeight || 0) > 36;

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

  const getTextAboutCoupons = () => {
    const { isFetching, isError, currentData } = couponsData || {};
    if (isFetching) return 'Загружаю доступные ячейки записи';
    if (isError) return 'Так далеко в будущее мы не заглядываем';
    if (currentData) return 'Похоже талонов нет...';
    return 'Если вы видите это сообщение - напишите в поддержку';
  };

  useEffect(() => {
    const coupons = couponsData?.currentData;
    setSelectedCoupon(coupons ? coupons[0]! : null);
  }, [couponsData, setSelectedCoupon]);

  return couponsData?.currentData?.length ? (
    <section className="coupons">
      <h4 className="coupons__title">Свободное время:</h4>
      <ul className={cn('coupons__list', isActiveList && 'coupons__list_active')} ref={ref}>
        {couponsData.currentData.map((el, i) => (
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
  ) : (
    <p>{getTextAboutCoupons()}</p>
  );
}
