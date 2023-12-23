import './index.scss';

import reactLogo from '~/shared/assets/icons/react.svg';
import viteLogo from '/vite.svg';

import GetCounter from '~/features/get-counter';
import GetFactOfCat from '~/features/get-fact-of-cat';

export default function ReduxPage() {
  return (
    <>
      <section className="redux-page">
        <GetFactOfCat />
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <GetCounter />
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </section>
    </>
  );
}
