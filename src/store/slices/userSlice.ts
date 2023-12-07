import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TCoordPar = null | number;

export interface ICoord {
  latitude: TCoordPar;
  longitude: TCoordPar;
  accuracy?: TCoordPar;
  altitude?: TCoordPar;
  altitudeAccuracy?: TCoordPar;
  heading?: TCoordPar;
  spees?: TCoordPar;
}

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
