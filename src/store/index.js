import { configureStore } from '@reduxjs/toolkit';
import { ridesApi } from 'store/api/rides';
import { vehiclesApi } from 'store/api/vehicles';
import { usersApi } from 'store/api/users';

export * from './api/rides';
export * from './api/vehicles';
export * from './api/users';

export const store = configureStore({
  reducer: {
    // rides: ridesSlice.reducer,
    [ridesApi.reducerPath]: ridesApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ridesApi.middleware,
      vehiclesApi.middleware,
      usersApi.middleware,
    ]),
});
