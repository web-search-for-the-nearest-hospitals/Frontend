import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { rtkqueryApi } from '~/shared/api/rtkqueryApi';
import userReducer from '~/entities/user';
import specialtyReducer from '~/entities/clinic/model/specialtiesSlice/specialtiesSlise';
import districtReducer from '~/entities/clinic/model//districtSlice/districtSlise';

export const store = configureStore({
  reducer: {
    [rtkqueryApi.reducerPath]: rtkqueryApi.reducer,
    user: userReducer,
    specialty: specialtyReducer,
    district: districtReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkqueryApi.middleware),
});

setupListeners(store.dispatch);
