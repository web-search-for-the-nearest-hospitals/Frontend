import './index.css';
import NotificationContainer from '~/widgets/notification-container/ui';
import '../shared/lib/Constants.scss';

import { withProviders } from './providers';
import { Routing } from '~/pages';

function App() {
  return (
    <>
      <Routing />
      <NotificationContainer />
    </>
  );
}

const AppWithProviders = withProviders(App);
export default AppWithProviders;
