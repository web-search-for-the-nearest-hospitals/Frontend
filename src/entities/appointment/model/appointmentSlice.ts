import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFormAppointmentData } from '~/widgets/form-appointment/ui';

const initialState = {} as IFormAppointmentData;

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setFormData: (_, action: PayloadAction<IFormAppointmentData>) => {
      return action.payload;
    },
  },
});

export const { setFormData } = appointmentSlice.actions;
export default appointmentSlice.reducer;
