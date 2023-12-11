import './index.scss';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/lib/hooks/reduxHooks';
import { decrement, increment, incrementByAmount, selectCount } from '~/shared/config/store/slices/counterSlice';

export function GetCounter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const refInput = useRef<HTMLInputElement | null>(null);

  return (
    <div className="card">
      <div className="card__content">
        <button className="card__btn" onClick={() => dispatch(increment())}>
          +
        </button>
        <span>count is {count}</span>
        <button className="card__btn" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div className="card__content">
        <button className="card__btn" onClick={() => dispatch(incrementByAmount(refInput?.current?.value || '0'))}>
          Изменить на
        </button>
        <input ref={refInput} placeholder="Ваше число"></input>
      </div>
    </div>
  );
}
