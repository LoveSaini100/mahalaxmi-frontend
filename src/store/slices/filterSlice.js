import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  propertyType: 'All',
  purpose: 'All',
  location: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: 'Any',
  bathrooms: 'Any',
  status: 'All',
  sort: 'newest',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (action.payload && action.payload.key !== undefined) {
        state[action.payload.key] = action.payload.value;
      } else if (typeof action.payload === 'object') {
        Object.assign(state, action.payload);
      }
      state.page = 1; // Reset to page 1 on filter change
    },
    setMultipleFilters: (state, action) => {
      Object.assign(state, action.payload);
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: () => ({ ...initialState }),
  },
});

export const { setFilter, setMultipleFilters, setPage, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
