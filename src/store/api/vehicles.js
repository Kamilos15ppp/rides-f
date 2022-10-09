import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;

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
  tagTypes: ['Buses', 'Trams', 'Others', 'Depots', 'All'],
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
    getAllVehicles: builder.query({
      query: () => 'vehicles/all',
      providesTags: ['All'],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Buses', 'Trams', 'Others', 'All'],
    }),
    getDepots: builder.query({
      query: () => 'vehicles/depots',
      providesTags: ['Depots'],
    }),
  }),
});

export const {
  useGetBusesQuery,
  useGetTramsQuery,
  useGetOthersQuery,
  useGetAllVehiclesQuery,
  useDeleteVehicleMutation,
  useGetDepotsQuery,
} = vehiclesApi;
