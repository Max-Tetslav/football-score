import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentPageInitialState } from '../../models/common';

export const initialState: ICurrentPageInitialState = {
  name: '',
  id: 0,
};

const calendarSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    updateCurrentPageName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    updateCurrentPageId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

export const { updateCurrentPageName, updateCurrentPageId } = calendarSlice.actions;
export default calendarSlice.reducer;
