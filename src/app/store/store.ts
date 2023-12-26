import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../../entities/user/model/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
