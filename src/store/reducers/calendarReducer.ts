import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICalendarItitialState, IMatch } from '../../models/calendarView';

export const initialState: ICalendarItitialState = {
  matches: [],
  matchesNum: 0,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    updateMatches(state, action: PayloadAction<IMatch[]>) {
      state.matches = action.payload;
    },
    updateMatchesNum(state, action: PayloadAction<number>) {
      state.matchesNum = action.payload;
    },
  },
});

export const { updateMatches, updateMatchesNum } = calendarSlice.actions;
export default calendarSlice.reducer;
