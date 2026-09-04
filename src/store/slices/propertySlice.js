import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchPropertiesThunk = createAsyncThunk(
  'properties/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await API.get('/properties', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPropertyBySlugThunk = createAsyncThunk(
  'properties/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await API.get(`/properties/${slug}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPropertyThunk = createAsyncThunk(
  'properties/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePropertyThunk = createAsyncThunk(
  'properties/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/properties/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePropertyThunk = createAsyncThunk(
  'properties/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/properties/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const togglePropertyStatusThunk = createAsyncThunk(
  'properties/toggleStatus',
  async ({ id, field }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/properties/${id}/toggle`, { field });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    list: [],
    featuredList: [],
    selectedProperty: null,
    total: 0,
    page: 1,
    pages: 1,
    loading: false,
    detailLoading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesThunk.fulfilled, (state, action) => {
        state.loading = false;
        const list = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
          ? action.payload
          : [];
        state.list = list;
        state.total = action.payload?.total ?? list.length;
        state.page = action.payload?.page ?? 1;
        state.pages = action.payload?.pages ?? 1;
        // Populate featured list safely
        state.featuredList = list.filter((item) => item?.featured);
      })
      .addCase(fetchPropertiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (!Array.isArray(state.list)) state.list = [];
        if (!Array.isArray(state.featuredList)) state.featuredList = [];
      })
      .addCase(fetchPropertyBySlugThunk.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchPropertyBySlugThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyBySlugThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePropertyThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(togglePropertyStatusThunk.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { clearSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
