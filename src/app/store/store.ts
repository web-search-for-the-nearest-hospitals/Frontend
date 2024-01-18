import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../../entities/user/model/userSlice';
import appointmentReducer from '~/entities/appointment/model/appointmentSlice';

import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkqueryApi } from '~/shared/api/rtkqueryApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,

    [rtkqueryApi.reducerPath]: rtkqueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqueryApi.middleware),
});

setupListeners(store.dispatch);
