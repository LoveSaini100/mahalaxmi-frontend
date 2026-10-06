import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import propertiesData from '../../data/propertiesData';

// Helper function to filter and paginate local propertiesData offline
const filterLocalProperties = (params = {}) => {
  let list = Array.isArray(propertiesData) ? [...propertiesData] : [];

  if (params.featured) {
    list = list.filter((p) => p.featured);
  }

  if (params.propertyType && params.propertyType !== 'All') {
    const type = params.propertyType.toLowerCase();
    list = list.filter((p) => {
      const pType = (p.propertyType || '').toLowerCase();
      if (type === 'residential') {
        return ['residential', 'villa', 'house', 'apartment'].includes(pType);
      }
      if (type === 'commercial') {
        return ['commercial', 'shop', 'office', 'showroom', 'warehouse'].includes(pType);
      }
      if (type === 'plot' || type === 'land') {
        return ['plot', 'land', 'agricultural', 'commercial plot'].includes(pType);
      }
      return pType.includes(type);
    });
  }

  if (params.purpose && params.purpose !== 'All') {
    list = list.filter((p) => (p.purpose || '').toLowerCase() === params.purpose.toLowerCase());
  }

  if (params.location) {
    const loc = params.location.toLowerCase();
    list = list.filter(
      (p) =>
        (p.location && p.location.toLowerCase().includes(loc)) ||
        (p.city && p.city.toLowerCase().includes(loc)) ||
        (p.address && p.address.toLowerCase().includes(loc))
    );
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.address && p.address.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.propertyType && p.propertyType.toLowerCase().includes(q))
    );
  }

  if (params.minPrice) {
    list = list.filter((p) => Number(p.price) >= Number(params.minPrice));
  }

  if (params.maxPrice) {
    list = list.filter((p) => Number(p.price) <= Number(params.maxPrice));
  }

  if (params.bedrooms && params.bedrooms !== 'Any') {
    list = list.filter((p) => Number(p.bedrooms) >= Number(params.bedrooms));
  }

  if (params.status && params.status !== 'All') {
    list = list.filter((p) => (p.propertyStatus || '').toLowerCase() === params.status.toLowerCase());
  }

  // Sorting
  if (params.sort === 'price-asc') {
    list.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (params.sort === 'price-desc') {
    list.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const total = list.length;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 9;
  const pages = Math.max(1, Math.ceil(total / limit));

  // If limit is provided, paginate, otherwise return all
  const paginatedList = params.limit ? list.slice((page - 1) * limit, page * limit) : list;

  return {
    data: paginatedList,
    total,
    page,
    pages,
  };
};

export const fetchPropertiesThunk = createAsyncThunk(
  'properties/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await API.get('/properties', { params });
      return response.data;
    } catch (error) {
      // Fallback to local data if backend is not running
      return filterLocalProperties(params);
    }
  }
);

export const fetchPropertyBySlugThunk = createAsyncThunk(
  'properties/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await API.get(`/properties/${slug}`);
      return response.data?.data || response.data;
    } catch (error) {
      const found = propertiesData.find(
        (p) => p.slug === slug || p._id === slug || String(p.id) === slug
      );
      if (found) return found;
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
      return response.data?.data || response.data;
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
      return response.data?.data || response.data;
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
      return response.data?.data || response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialProperties = Array.isArray(propertiesData) ? propertiesData : [];

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    list: initialProperties,
    featuredList: initialProperties.filter((item) => item?.featured),
    selectedProperty: null,
    total: initialProperties.length,
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
            : initialProperties;
        state.list = list;
        state.total = action.payload?.total ?? list.length;
        state.page = action.payload?.page ?? 1;
        state.pages = action.payload?.pages ?? Math.max(1, Math.ceil(state.total / 9));
        state.featuredList = list.filter((item) => item?.featured);
      })
      .addCase(fetchPropertiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (!Array.isArray(state.list) || state.list.length === 0) {
          const fallback = filterLocalProperties(action.meta?.arg || {});
          state.list = fallback.data;
          state.total = fallback.total;
          state.page = fallback.page;
          state.pages = fallback.pages;
          state.featuredList = initialProperties.filter((item) => item?.featured);
        }
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
        const slug = action.meta?.arg;
        state.selectedProperty =
          initialProperties.find((p) => p.slug === slug || p._id === slug || String(p.id) === slug) || null;
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
