import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function WithReduxStore(component: () => React.ReactNode | JSX.Element) {
  // eslint-disable-next-line react/display-name
  return () => (
    <Provider store={store}>
      <Suspense fallback="Loading Redux Store...">{component()}</Suspense>
    </Provider>
  );
}
