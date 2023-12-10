import Header from '~/widgets/Header/Header';
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
