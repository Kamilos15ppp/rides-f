import { configureStore } from '@reduxjs/toolkit';
import { ridesApi } from 'store/api/rides';
import { vehiclesApi } from 'store/api/vehicles';
import { usersApi } from 'store/api/users';
import { userApi } from './api/user';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import chartReducer from './chartSlice';

export * from './api/rides';
export * from './api/vehicles';
export * from './api/users';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    chart: chartReducer,
    [ridesApi.reducerPath]: ridesApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ridesApi.middleware,
      vehiclesApi.middleware,
      usersApi.middleware,
      userApi.middleware,
    ]),
});
