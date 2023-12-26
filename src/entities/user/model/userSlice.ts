import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoord } from '~/shared/lib/types/interfaces';

const initialState = {
  latitude: null,
  longitude: null,
} as ICoord;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCoord: (_, action: PayloadAction<ICoord>) => {
      return action.payload;
    },
  },
});

export const { setCoord } = userSlice.actions;
export const userSelect = (state: RootState) => state.user;
export default userSlice.reducer;
