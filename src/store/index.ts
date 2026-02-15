import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import busesReducer from './slices/busesSlice';
import bookingsReducer from './slices/bookingsSlice';
import userTripsReducer from './slices/userTripsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
    bookings: bookingsReducer,
    userTrips: userTripsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
