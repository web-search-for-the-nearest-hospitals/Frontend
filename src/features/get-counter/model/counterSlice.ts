import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICounterState {
  value: number;
}

const initialState: ICounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.value += Number(action.payload);
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: RootState) => state.counter.value; // counter - указание state в store
export default counterSlice.reducer;
