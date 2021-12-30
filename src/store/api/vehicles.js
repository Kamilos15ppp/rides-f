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

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: baseQuery,
  tagTypes: ['Buses', 'Trams', 'Others'],
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: () => 'vehicles/buses',
      providesTags: ['Buses'],
    }),
    getTrams: builder.query({
      query: () => 'vehicles/trams',
      providesTags: ['Trams'],
    }),
    getOthers: builder.query({
      query: () => 'vehicles/others',
      providesTags: ['Others'],
    }),
    // addRide: builder.mutation({
    //   query: (body) => ({
    //     url: 'rides',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Rides'],
    // }),
    // updateRide: builder.mutation({
    //   query: (body) => ({
    //     url: `rides/${body.id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Rides'],
    // }),
    // deleteRide: builder.mutation({
    //   query: (id) => ({
    //     url: `rides/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Rides'],
    // }),
  }),
});

export const { useGetBusesQuery, useGetTramsQuery, useGetOthersQuery } =
  vehiclesApi;
