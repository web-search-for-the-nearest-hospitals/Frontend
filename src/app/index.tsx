import Header from '~/components/common/Header/Header';
import { withProviders } from './providers';
import { Routing } from '~/pages';

function App() {
  return (
    <>
      <Header />
      <Routing />
    </>
  );
}

const AppWithProviders = withProviders(App);
export default AppWithProviders;
