import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginApi, signupApi} from '../../services/authApi';
import {LoginPayload, SignupPayload, User} from '../../types';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  {rejectValue: string}
>('auth/loginUser', async (payload, {rejectWithValue}) => {
  try {
    const user = await loginApi(payload);
    return user;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to login at the moment';
    return rejectWithValue(message);
  }
});

export const signupUser = createAsyncThunk<
  User,
  SignupPayload,
  {rejectValue: string}
>('auth/signupUser', async (payload, {rejectWithValue}) => {
  try {
    const user = await signupApi(payload);
    return user;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to signup at the moment';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Login failed';
      })
      .addCase(signupUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Signup failed';
      });
  },
});

export const {clearAuthError, setUser, logout} = authSlice.actions;
export default authSlice.reducer;
