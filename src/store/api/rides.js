import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:8000/api',
  baseUrl: 'https://przejazdy-api.you2.pl/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('przejazdykm_token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.set('accept', 'application/json');
    }

    return headers;
  },
});

export const ridesApi = createApi({
  reducerPath: 'ridesApi',
  baseQuery: baseQuery,
  tagTypes: ['Rides', 'Ranking', 'Statement'],
  endpoints: (builder) => ({
    getRides: builder.query({
      query: () => 'rides',
      providesTags: ['Rides'],
    }),
    addRide: builder.mutation({
      query: (body) => ({
        url: 'rides',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rides', 'Ranking', 'Statement'],
    }),
    updateRide: builder.mutation({
      query: (body) => ({
        url: `rides/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Rides'],
    }),
    deleteRide: builder.mutation({
      query: (id) => ({
        url: `rides/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rides', 'Ranking', 'Statement'],
    }),
    getRanking: builder.query({
      query: () => 'stats/ranking',
      providesTags: ['Ranking'],
    }),
    getStatement: builder.query({
      query: () => 'stats/statement',
      providesTags: ['Statement'],
    }),
  }),
});

export const {
  useGetRidesQuery,
  useAddRideMutation,
  useDeleteRideMutation,
  useUpdateRideMutation,
  useGetRankingQuery,
  useGetStatementQuery,
} = ridesApi;
