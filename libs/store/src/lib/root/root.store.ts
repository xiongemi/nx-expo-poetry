import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { initialRootState } from './root-state.initial';
import { rootReducer } from './root.reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

export const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return isDevelopment ? defaultMiddleware.concat(logger) : defaultMiddleware;
  },
  devTools: isDevelopment,
  preloadedState: initialRootState,
});
