import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchUserByIdApi} from '../../services/userApi';
import {Booking} from '../../types';

type UserTripsState = {
  upcomingTrips: Booking[];
  bookingHistory: Booking[];
  isLoading: boolean;
  error: string | null;
};

const initialState: UserTripsState = {
  upcomingTrips: [],
  bookingHistory: [],
  isLoading: false,
  error: null,
};

export const fetchUserTrips = createAsyncThunk<
  {upcomingTrips: Booking[]; bookingHistory: Booking[]},
  string,
  {rejectValue: string}
>('userTrips/fetchUserTrips', async (userId, {rejectWithValue}) => {
  try {
    const user = await fetchUserByIdApi(userId);
    return {
      upcomingTrips: user.upcomingBookings,
      bookingHistory: user.bookingHistory,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to fetch trips right now';
    return rejectWithValue(message);
  }
});

const userTripsSlice = createSlice({
  name: 'userTrips',
  initialState,
  reducers: {
    clearUserTripsState(state) {
      state.upcomingTrips = [];
      state.bookingHistory = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserTrips.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.upcomingTrips = action.payload.upcomingTrips;
        state.bookingHistory = action.payload.bookingHistory;
      })
      .addCase(fetchUserTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unable to fetch trips';
      });
  },
});

export const {clearUserTripsState} = userTripsSlice.actions;
export default userTripsSlice.reducer;
