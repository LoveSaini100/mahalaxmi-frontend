import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import propertyReducer from './slices/propertySlice';
import filterReducer from './slices/filterSlice';
import enquiryReducer from './slices/enquirySlice';
import testimonialReducer from './slices/testimonialSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';
import galleryReducer from './slices/gallerySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    filters: filterReducer,
    enquiries: enquiryReducer,
    testimonials: testimonialReducer,
    settings: settingsReducer,
    ui: uiReducer,
    gallery: galleryReducer,
  },
});
