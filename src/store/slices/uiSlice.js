import { createSlice } from '@reduxjs/toolkit';

const getSavedFavorites = () => {
  try {
    const saved = localStorage.getItem('mahalaxmi_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
    filterDrawerOpen: false,
    favorites: getSavedFavorites(),
    toast: null, // { type: 'success'|'error'|'info', message: string }
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenu: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleFilterDrawer: (state) => {
      state.filterDrawerOpen = !state.filterDrawerOpen;
    },
    setFilterDrawer: (state, action) => {
      state.filterDrawerOpen = action.payload;
    },
    toggleFavorite: (state, action) => {
      const propertyId = action.payload;
      if (state.favorites.includes(propertyId)) {
        state.favorites = state.favorites.filter((id) => id !== propertyId);
      } else {
        state.favorites.push(propertyId);
      }
      localStorage.setItem('mahalaxmi_favorites', JSON.stringify(state.favorites));
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenu,
  toggleFilterDrawer,
  setFilterDrawer,
  toggleFavorite,
  showToast,
  clearToast,
} = uiSlice.actions;
export default uiSlice.reducer;
