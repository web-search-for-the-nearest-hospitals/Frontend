import Header from '~/widgets/Header/ui';
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
