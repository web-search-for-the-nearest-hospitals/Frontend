import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoord } from '~/shared/lib/types/interfaces';

interface IUserSlice {
  coord: ICoord;
}

const initialState = {
  coord: { latitude: null, longitude: null },
} as IUserSlice;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCoord: (state, action: PayloadAction<ICoord>) => {
      state.coord = { ...action.payload };
    },
  },
});

export const { setCoord } = userSlice.actions;
export const userSelect = (state: RootState) => state.user;
export default userSlice.reducer;
