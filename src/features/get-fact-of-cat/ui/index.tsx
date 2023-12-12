import { Provider } from 'react-redux';
import { store } from '../model/store';
import _GetFactOfCat from './_GetFactOfCat';

export default function GetFactOfCat() {
  return (
    <Provider store={store}>
      <_GetFactOfCat />
    </Provider>
  );
}
