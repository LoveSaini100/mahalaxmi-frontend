import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchTestimonialsThunk = createAsyncThunk(
  'testimonials/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/testimonials');
      return response.data?.data || response.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTestimonialThunk = createAsyncThunk(
  'testimonials/create',
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await API.post('/testimonials', testimonialData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTestimonialThunk = createAsyncThunk(
  'testimonials/update',
  async ({ id, testimonialData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/testimonials/${id}`, testimonialData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTestimonialThunk = createAsyncThunk(
  'testimonials/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/testimonials/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonialsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTestimonialsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (!Array.isArray(state.list)) state.list = [];
      })
      .addCase(createTestimonialThunk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateTestimonialThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTestimonialThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default testimonialSlice.reducer;
