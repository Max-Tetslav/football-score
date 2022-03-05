import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITeam, ITeamsInitialState } from '../../models/teamsView';

export const initialState: ITeamsInitialState = {
  teams: [],
  teamsNum: 0,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    updateTeams(state, action: PayloadAction<ITeam[]>) {
      state.teams = action.payload;
    },
    updateTeamsNum(state, action: PayloadAction<number>) {
      state.teamsNum = action.payload;
    },
  },
});

export const { updateTeams, updateTeamsNum } = teamsSlice.actions;
export default teamsSlice.reducer;
