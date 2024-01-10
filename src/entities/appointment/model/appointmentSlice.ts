import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AppointmentState {
  formData: {
    name: string;
    phoneNumber: string;
    email: string;
    doctorSpecialty: string;
    appointmentDate: string;
  };
}

const initialState: AppointmentState = {
  formData: {
    name: '',
    phoneNumber: '',
    email: '',
    doctorSpecialty: '',
    appointmentDate: '',
  },
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<AppointmentState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { setFormData } = appointmentSlice.actions;
export default appointmentSlice.reducer;
