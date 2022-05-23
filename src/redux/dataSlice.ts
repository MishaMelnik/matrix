import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../models/models';

interface DataState {
  data: Data[];
}
const initialState: DataState = {
  data: [],
};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
