import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { fetchSettingsThunk } from './store/slices/settingsSlice';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettingsThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
