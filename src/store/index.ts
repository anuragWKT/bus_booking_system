import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import busesReducer from './slices/busesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
