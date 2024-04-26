import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { store, persistor } from '@/store/store'
import theme from '@/theme';
import App from '@/App'

import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Override global staleTime
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<>Loading...</>}>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </BrowserRouter>

          </Suspense>
        </ThemeProvider>

      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
