import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {bookTicketsApi, cancelBookingApi} from '../../services/bookingApi';
import {Booking} from '../../types';

type BookTicketsPayload = {
  userId: string;
  busId: string;
  numberOfSeats: number;
};

type BookingsState = {
  isBooking: boolean;
  bookingError: string | null;
  lastBooking: Booking | null;
};

const initialState: BookingsState = {
  isBooking: false,
  bookingError: null,
  lastBooking: null,
};

export const bookTickets = createAsyncThunk<
  Booking,
  BookTicketsPayload,
  {rejectValue: string}
>('bookings/bookTickets', async (payload, {rejectWithValue}) => {
  try {
    const booking = await bookTicketsApi(payload);
    return booking;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to complete booking right now';
    return rejectWithValue(message);
  }
});

export const cancelBooking = createAsyncThunk<Booking, string, {rejectValue: string}>(
  'bookings/cancelBooking',
  async (bookingId, {rejectWithValue}) => {
    try {
      const booking = await cancelBookingApi(bookingId);
      return booking;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to cancel booking right now';
      return rejectWithValue(message);
    }
  },
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingState(state) {
      state.isBooking = false;
      state.bookingError = null;
      state.lastBooking = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bookTickets.pending, state => {
        state.isBooking = true;
        state.bookingError = null;
      })
      .addCase(bookTickets.fulfilled, (state, action) => {
        state.isBooking = false;
        state.bookingError = null;
        state.lastBooking = action.payload;
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.isBooking = false;
        state.bookingError = action.payload ?? 'Booking failed';
      })
      .addCase(cancelBooking.pending, state => {
        state.isBooking = true;
        state.bookingError = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isBooking = false;
        state.bookingError = null;
        state.lastBooking = action.payload;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isBooking = false;
        state.bookingError = action.payload ?? 'Cancel failed';
      });
  },
});

export const {clearBookingState} = bookingsSlice.actions;
export default bookingsSlice.reducer;
