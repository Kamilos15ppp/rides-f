import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    phrase: null,
    field: null,
    sortField: null,
    isDateSelected: false,
    startDate: null,
    endDate: null,
  },
  reducers: {
    saveSearchInfo: (state, action) => {
      const { payload } = action;
      state.phrase = payload.phrase;
      state.field = payload.field;
      state.isDateSelected = payload.isDateSelected;
    },
    saveSearchPhrase: (state, action) => {
      state.phrase = action.payload;
    },
    saveStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    saveEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    saveSortField: (state, action) => {
      state.sortField = action.payload;
    },
    clearPhrase: (state) => {
      state.phrase = null;
    },
  },
});

export const {
  saveSearchInfo,
  saveStartDate,
  saveEndDate,
  saveSearchPhrase,
  saveSortField,
  clearPhrase,
} = searchSlice.actions;

export default searchSlice.reducer;
