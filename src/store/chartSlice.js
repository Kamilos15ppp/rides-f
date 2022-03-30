import { createSlice } from '@reduxjs/toolkit';

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    dataInCurrentYear: null,
    dataBeforeCurrentYear: null,
    dataInAllYears: null,
  },
  reducers: {
    saveDataInCurrentYear: (state, action) => {
      state.dataInCurrentYear = action.payload;
    },
    saveDataBeforeCurrentYear: (state, action) => {
      state.dataBeforeCurrentYear = action.payload;
    },
    saveDataInAllYears: (state, action) => {
      state.dataInAllYears = action.payload;
    },
  },
});

export const {
  saveDataInCurrentYear,
  saveDataBeforeCurrentYear,
  saveDataInAllYears,
} = chartSlice.actions;

export default chartSlice.reducer;
