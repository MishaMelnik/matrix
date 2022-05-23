import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

export const setupStore = () => {
  return configureStore({
    reducer: dataReducer,
  });
};

export type RootState = ReturnType<typeof dataReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
