import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IDistrict } from '~/shared/lib/types/interfaces';

const initialState = null as unknown as IDistrict[];

export const districtSlice = createSlice({
  name: 'districts',
  initialState,
  reducers: {
    setDistrict: (_, action: PayloadAction<IDistrict[]>) => {
      return action.payload;
    },
  },
});

export const { setDistrict } = districtSlice.actions;
export const districtSelect = (state: RootState) => state.district;
export default districtSlice.reducer;
