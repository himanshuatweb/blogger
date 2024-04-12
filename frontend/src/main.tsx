import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { store, persistor } from '@/store/store'
import theme from '@/theme';
import App from '@/App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<>Loading...</>}>
            <BrowserRouter>
              <App />
            </BrowserRouter>

          </Suspense>
        </ThemeProvider>

      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
