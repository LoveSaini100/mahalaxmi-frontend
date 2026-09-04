import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchSettingsThunk = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/settings');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSettingsThunk = createAsyncThunk(
  'settings/update',
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await API.put('/settings', settingsData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    data: {
      companyName: 'MAHALAXMI PROPERTY',
      tagline: 'Your Gateway to Dream Homes & Prosperity',
      phone: '+91 9917970750',
      whatsApp: '+91 9917970750',
      address: 'Near Pencho Restaurant, Dehradun–Saharanpur Highway, Biharigarh, 247662, Saharanpur, Uttar Pradesh',
      email: 'info@mahalaxmiproperty.in',
      founderName: 'Mahalaxmi Property Founder',
      founderTitle: 'Founder & Managing Director',
      founderMessage: 'Welcome to Mahalaxmi Property. Our commitment is founded on trust, absolute transparency, and delivering exceptional value for every client.',
      businessHours: 'Mon - Sat: 9:00 AM - 7:30 PM',
      seoTitle: 'Mahalaxmi Property - Premium Real Estate in Biharigarh & Saharanpur',
      seoDescription: 'Discover premium properties, plots, commercial land, and residential homes with Mahalaxmi Property near Dehradun-Saharanpur Highway, Biharigarh.',
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsThunk.fulfilled, (state, action) => {
        if (action.payload) state.data = action.payload;
      })
      .addCase(updateSettingsThunk.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default settingsSlice.reducer;
