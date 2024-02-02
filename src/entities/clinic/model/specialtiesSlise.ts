import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISpecialty } from '~/shared/lib/types/interfaces';

const initialState = null as unknown as ISpecialty[];

export const specialtySlice = createSlice({
  name: 'specialties',
  initialState,
  reducers: {
    setSpecialties: (_, action: PayloadAction<ISpecialty[]>) => {
      return action.payload;
    },
  },
});

export const { setSpecialties } = specialtySlice.actions;
export const specialtySelect = (state: RootState) => state.specialty;
export default specialtySlice.reducer;
