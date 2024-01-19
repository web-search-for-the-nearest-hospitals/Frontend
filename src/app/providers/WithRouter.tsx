import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function WithRouter(component: () => React.ReactNode) {
  // eslint-disable-next-line react/display-name
  return () => (
    <BrowserRouter>
      <Suspense fallback="Loading router...">{component()}</Suspense>
    </BrowserRouter>
  );
}
