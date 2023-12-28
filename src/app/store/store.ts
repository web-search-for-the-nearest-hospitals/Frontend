import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../entities/user/model/userSlice';
import appointmentReducer from '~/entities/appointment/model/appointmentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
