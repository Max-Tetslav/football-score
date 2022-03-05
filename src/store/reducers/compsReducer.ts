import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComp, ICompsInitialState } from '../../models/compsView';

export const initialState: ICompsInitialState = {
  comps: [],
  compsNum: 0,
};

const compsSlice = createSlice({
  name: 'comps',
  initialState,
  reducers: {
    updateComps(state, action: PayloadAction<IComp[]>) {
      state.comps = action.payload;
    },
    updateCompsNum(state, action: PayloadAction<number>) {
      state.compsNum = action.payload;
    },
  },
});

export const { updateComps, updateCompsNum } = compsSlice.actions;
export default compsSlice.reducer;
