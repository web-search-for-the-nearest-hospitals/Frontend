import reactLogo from '../../../assets/icons/react.svg';
import viteLogo from '/vite.svg';
import './MainPage.scss';
import { useAppDispatch, useAppSelector } from '../../../helpers/customHooks/reduxHooks';
import { decrement, increment, incrementByAmount, selectCount } from '../../../store/slices/counterSlice';
import { useRef } from 'react';

function MainPage() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const refInput = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <main className="main">
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
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
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </main>
    </>
  );
}

export default MainPage;
