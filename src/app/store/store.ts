import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rtkqueryApi } from '~/shared/api/rtkqueryApi';
import userReducer from '../../entities/user/model/userSlice';
import appointmentReducer from '~/entities/appointment/model/appointmentSlice';

export const store = configureStore({
  reducer: {
    [rtkqueryApi.reducerPath]: rtkqueryApi.reducer,
    user: userReducer,
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqueryApi.middleware),
});

setupListeners(store.dispatch);
