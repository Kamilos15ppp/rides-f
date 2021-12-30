import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('przejazdykm_token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
    }

    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users-management',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: 'users-management',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users-management/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } =
  usersApi;
