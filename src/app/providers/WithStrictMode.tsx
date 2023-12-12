import React, { Suspense } from 'react';

export default function WithStrictMode(component: () => React.ReactNode) {
  // eslint-disable-next-line react/display-name
  return () => (
    <React.StrictMode>
      <Suspense fallback="Loading Strict Mode...">{component()}</Suspense>
    </React.StrictMode>
  );
}
