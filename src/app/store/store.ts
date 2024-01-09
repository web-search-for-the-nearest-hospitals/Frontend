import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rtkqueryApi } from '~/shared/api/rtkqueryApi';
import userSlice from '../../entities/user/model/userSlice';

export const store = configureStore({
  reducer: {
    [rtkqueryApi.reducerPath]: rtkqueryApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqueryApi.middleware),
});

setupListeners(store.dispatch);
