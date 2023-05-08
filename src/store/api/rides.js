import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;
    // const token = localStorage.getItem('przejazdykm_token');

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
      invalidatesTags: ['Rides', 'Ranking', 'Statement'],
    }),
    deleteRide: builder.mutation({
      query: (id) => ({
        url: `rides/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rides', 'Ranking', 'Statement'],
    }),
    searchRides: builder.mutation({
      query: (body) => ({
        url: `search?phrase=${body.phrase}&column=${body.column}&start=${body.start}&startDate=${body.startDate}&endDate=${body.endDate}&sort=${body.sort}&order=${body.order}`,
        method: 'POST',
        body,
      }),
    }),
    getRanking: builder.query({
      query: () => 'stats/ranking',
      providesTags: ['Ranking'],
    }),
    getStatement: builder.query({
      query: () => 'stats/statement',
      providesTags: ['Statement'],
    }),
    getAutocomplete: builder.query({
      query: () => 'autocomplete',
    }),
  }),
});

export const {
  useGetRidesQuery,
  useAddRideMutation,
  useDeleteRideMutation,
  useUpdateRideMutation,
  useSearchRidesMutation,
  useGetRankingQuery,
  useGetStatementQuery,
  useGetAutocompleteQuery,
} = ridesApi;
