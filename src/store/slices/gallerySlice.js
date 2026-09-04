import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchGalleryThunk = createAsyncThunk(
  'gallery/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/gallery');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGalleryItemThunk = createAsyncThunk(
  'gallery/create',
  async (galleryData, { rejectWithValue }) => {
    try {
      const response = await API.post('/gallery', galleryData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGalleryItemThunk = createAsyncThunk(
  'gallery/update',
  async ({ id, galleryData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/gallery/${id}`, galleryData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGalleryItemThunk = createAsyncThunk(
  'gallery/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/gallery/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchGalleryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGalleryItemThunk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateGalleryItemThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteGalleryItemThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      });
  },
});

export default gallerySlice.reducer;
