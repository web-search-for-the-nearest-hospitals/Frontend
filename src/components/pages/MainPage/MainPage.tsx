import reactLogo from '../../../assets/icons/react.svg';
import viteLogo from '/vite.svg';
import { useAppDispatch, useAppSelector } from '../../../helpers/customHooks/reduxHooks';
import { decrement, increment, incrementByAmount, selectCount } from '../../../store/slices/counterSlice';
import { useEffect, useRef } from 'react';
import { useGetRandomFactAboutCatQuery, useLazyGetRandomFactAboutCatQuery } from '../../../services/RTKQuery';
import './MainPage.scss';

function MainPage() {
  // Несмотря на то, что это "2 разные реализации, они ссылаются на один объект-функцию и получают одни и те же данные"
  const { error, isLoading, data } = useGetRandomFactAboutCatQuery(null);
  const [triggerQuery, queryResult, lastPromiseInfo] = useLazyGetRandomFactAboutCatQuery();

  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const refInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    triggerQuery(null);
    console.log(queryResult, lastPromiseInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerQuery]);

  return (
    <>
      <main className="main">
        <h3>Случайный факт о котиках</h3>
        <p style={{ maxWidth: '600px', margin: 'auto' }}>
          {error ? 'произошла ошибка' : isLoading ? 'загружаем' : data?.fact}
        </p>
        <h3>Случайный факт о котиках из lazy функции</h3>
        <p style={{ maxWidth: '600px', margin: 'auto' }}>
          {queryResult.error ? 'произошла ошибка' : queryResult.isLoading ? 'загружаем' : queryResult.data?.fact}
        </p>
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
