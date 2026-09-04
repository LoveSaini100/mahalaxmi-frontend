import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const token = localStorage.getItem('mahalaxmi_admin_token');

export const loginAdminThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post('/auth/login', credentials);
      localStorage.setItem('mahalaxmi_admin_token', response.data.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMeThunk = createAsyncThunk(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/auth/me');
      return response.data.data;
    } catch (error) {
      localStorage.removeItem('mahalaxmi_admin_token');
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('mahalaxmi_admin_token');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdminThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
