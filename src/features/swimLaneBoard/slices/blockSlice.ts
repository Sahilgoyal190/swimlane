import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showBlockForm: false,
  isEditFlow: false,
  showValidation: false,
  blockData: {}
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    toggleBlockForm: (state, action) => {
      const { isEditFlow, blockData, open, showValidation } = action.payload;
      state.showBlockForm = open;
      if (open) {
        state.isEditFlow = isEditFlow;
        state.blockData = blockData;
        state.showValidation = showValidation;
      } else {
        state.isEditFlow = false;
        state.blockData = {};
        state.showValidation = false;
      }
    }
  }
});

export const { toggleBlockForm } = blockSlice.actions;

export default blockSlice.reducer;
