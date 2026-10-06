import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { fetchSettingsThunk } from './store/slices/settingsSlice';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/common/SplashScreen';

const AppContent = () => {
  const dispatch = useDispatch();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    dispatch(fetchSettingsThunk());
  }, [dispatch]);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
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
