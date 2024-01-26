import './index.scss';
import NotificationContainer from '~/widgets/notification-container/ui/toast-notification';

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
