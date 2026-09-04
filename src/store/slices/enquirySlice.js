import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const submitEnquiryThunk = createAsyncThunk(
  'enquiries/submit',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await API.post('/enquiries', enquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEnquiriesThunk = createAsyncThunk(
  'enquiries/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/enquiries');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEnquiryStatusThunk = createAsyncThunk(
  'enquiries/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/enquiries/${id}`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEnquiryThunk = createAsyncThunk(
  'enquiries/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/enquiries/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const enquirySlice = createSlice({
  name: 'enquiries',
  initialState: {
    list: [],
    loading: false,
    submitting: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearEnquiryStatus: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiryThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitEnquiryThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.successMessage = action.payload.message;
        if (action.payload && action.payload.data) {
          state.list.unshift(action.payload.data);
        }
      })
      .addCase(submitEnquiryThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })
      .addCase(fetchEnquiriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchEnquiriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEnquiryStatusThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteEnquiryThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e._id !== action.payload);
      });
  },
});

export const { clearEnquiryStatus } = enquirySlice.actions;
export default enquirySlice.reducer;
