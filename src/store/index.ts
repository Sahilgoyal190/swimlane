import { configureStore } from '@reduxjs/toolkit';

import blockReducer from '../features/swimLaneBoard/slices/blockSlice';
import lanesReducer from '../slices/lanesSlice';
import filterReducer from '../features/swimLaneBoard/slices/filterSlice';

export const store = configureStore({
  reducer: {
    block: blockReducer,
    lanes: lanesReducer,
    filters: filterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
