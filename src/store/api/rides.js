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
    getAutocompleteLines: builder.query({
      query: () => 'autocomplete/lines',
    }),
    getAutocompleteDirections: builder.query({
      query: () => 'autocomplete/directions',
    }),
    getAutocompleteStops: builder.query({
      query: () => 'autocomplete/stops',
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
  useGetAutocompleteLinesQuery,
  useGetAutocompleteDirectionsQuery,
  useGetAutocompleteStopsQuery,
} = ridesApi;
