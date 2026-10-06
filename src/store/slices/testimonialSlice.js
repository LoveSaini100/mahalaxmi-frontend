import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const defaultTestimonials = [
  {
    _id: 'test-mem-001',
    name: 'Amit Verma',
    location: 'Dehradun',
    review: 'Shree Mahalaxmi Properties and Construction (SMPC) helped me purchase a prime commercial plot in Biharigarh with absolute ease.',
    rating: 5,
  },
  {
    _id: 'test-mem-002',
    name: 'Rajesh Kumar',
    location: 'Saharanpur',
    review: 'Extremely professional real estate team! They guided me through every step of paperwork.',
    rating: 5,
  },
  {
    _id: 'test-mem-003',
    name: 'Vikas Sharma',
    location: 'Haridwar',
    review: 'Bought a 2 Bigha plot on Dehradun-Saharanpur Highway through Shree Mahalaxmi Properties and Construction (SMPC). Very transparent dealing with complete legal paper check.',
    rating: 5,
  },
  {
    _id: 'test-mem-004',
    name: 'Priya Chaudhari',
    location: 'Roorkee',
    review: 'Their team is genuinely trustworthy. They arranged quick site visits, clear negotiations with seller, and hassle-free registry assistance.',
    rating: 5,
  },
  {
    _id: 'test-mem-005',
    name: 'Sunil Gupta',
    location: 'Delhi NCR',
    review: 'Invested in commercial property near Biharigarh Pencho Highway junction. Exceptional guidance on land appreciation and future ROI!',
    rating: 5,
  },
  {
    _id: 'test-mem-006',
    name: 'Sanjay Rastogi',
    location: 'Chandigarh',
    review: 'Seamless experience purchasing a modern independent villa. Highly recommend Shree Mahalaxmi Properties and Construction (SMPC) for reliable real estate deals in UP & Uttarakhand.',
    rating: 5,
  }
];

export const fetchTestimonialsThunk = createAsyncThunk(
  'testimonials/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/testimonials');
      return response.data?.data || response.data || defaultTestimonials;
    } catch (error) {
      return defaultTestimonials;
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
    list: defaultTestimonials,
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
        state.list = Array.isArray(action.payload) && action.payload.length > 0 ? action.payload : defaultTestimonials;
      })
      .addCase(fetchTestimonialsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (!Array.isArray(state.list) || state.list.length === 0) state.list = defaultTestimonials;
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

export const defaultTestimonialData = defaultTestimonials;
export default testimonialSlice.reducer;
