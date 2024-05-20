import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  priority: string;
}

const initialState: FilterState = {
  priority: ''
};

interface SetFilterPayload {
  name: keyof FilterState;
  value: string;
}

const blockSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<SetFilterPayload>) => {
      const { name, value } = action.payload;
      state[name] = value;
    }
  }
});

export const { setFilter } = blockSlice.actions;

export default blockSlice.reducer;
