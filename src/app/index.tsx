import './index.css';

import { withProviders } from './providers';
import { Routing } from '~/pages';

function App() {
  return (
    <>
      <Routing />
    </>
  );
}

const AppWithProviders = withProviders(App);
export default AppWithProviders;
