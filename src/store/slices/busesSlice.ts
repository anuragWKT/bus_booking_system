import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchBusesApi} from '../../services/busApi';
import {Bus} from '../../types';

type BusesState = {
  buses: Bus[];
  isLoading: boolean;
  error: string | null;
};

const initialState: BusesState = {
  buses: [],
  isLoading: false,
  error: null,
};

export const fetchBuses = createAsyncThunk<Bus[], void, {rejectValue: string}>(
  'buses/fetchBuses',
  async (_, {rejectWithValue}) => {
    try {
      const buses = await fetchBusesApi();
      return buses;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to fetch buses right now';
      return rejectWithValue(message);
    }
  },
);

const busesSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBuses.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buses = action.payload;
        state.error = null;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unable to fetch buses';
      });
  },
});

export default busesSlice.reducer;
