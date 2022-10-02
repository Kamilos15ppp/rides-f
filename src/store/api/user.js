import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('przejazdykm_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    headers.set('accept', 'application/json');

    return headers;
  },
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logoutUser: builder.mutation({
      query: (body) => ({
        url: 'logout',
        method: 'POST',
        body,
      }),
    }),
    changeUserPassword: builder.mutation({
      query: (body) => ({
        url: 'change-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useChangeUserPasswordMutation,
} = userApi;
