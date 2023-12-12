import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../../features/get-counter/model/counterSlice';
import userSlice from '../../entities/user/model/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});
